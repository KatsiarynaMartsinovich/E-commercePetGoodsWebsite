import { FastifyInstance, FastifyRequest } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  productListQuerySchema,
  productIdParamSchema,
  productCreateSchema,
  productUpdateSchema,
} from '../schemas/product.schema.js';
import { ProductService } from '../services/product.service.js';
import { StorageService } from '../services/storage.service.js';
import { roleGuard } from '../utils/rbac.js';

async function parseMultipart(request: FastifyRequest) {
  const fields: Record<string, string> = {};
  const files: { buffer: Buffer; filename: string; mimetype: string }[] = [];

  for await (const part of request.parts()) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer();
      files.push({ buffer, filename: part.filename, mimetype: part.mimetype });
    } else {
      fields[part.fieldname] = String(part.value);
    }
  }
  return { fields, files };
}

export default async function productRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // GET /api/products
  app.get('/', {
    schema: { querystring: productListQuerySchema },
  }, async (request) => {
    return ProductService.list(request.query);
  });

  // GET /api/products/:id
  app.get('/:id', {
    schema: { params: productIdParamSchema },
  }, async (request, reply) => {
    try {
      return await ProductService.getById(request.params.id);
    } catch (err: any) {
      if (err.message === 'Product not found') {
        return reply.code(404).send({ error: 'Not Found', message: err.message });
      }
      throw err;
    }
  });

  // POST /api/products
  app.post('/', {
    preHandler: [app.authenticate, roleGuard(['ADMIN'])],
  }, async (request, reply) => {
    try {
      let payload: any;

      if (request.isMultipart()) {
        const { fields, files } = await parseMultipart(request);

        const uploadedUrls: string[] = [];
        for (const f of files) {
          const url = await StorageService.uploadImage(f.buffer, f.filename, f.mimetype);
          uploadedUrls.push(url);
        }

        payload = {
          title: fields.title,
          description: fields.description,
          price: fields.price,
          rating: fields.rating ?? 0,
          stockQuantity: fields.stockQuantity,
          images: uploadedUrls,
        };
      } else {
        payload = request.body;
      }

      const data = productCreateSchema.parse(payload);

      const product = await ProductService.create(data);
      return reply.code(201).send(product);
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return reply.code(400).send({ error: 'Validation Error', details: err.issues });
      }
      if (err.message?.startsWith('Unsupported file type')) {
        return reply.code(400).send({ error: 'Bad Request', message: err.message });
      }
      throw err;
    }
  });

  // PATCH /api/products/:id
  app.patch('/:id', {
    preHandler: [app.authenticate, roleGuard(['ADMIN'])],
    schema: { params: productIdParamSchema },
  }, async (request, reply) => {
    try {
      const data = productUpdateSchema.parse(request.body);
      const product = await ProductService.update(request.params.id, data);
      return product;
    } catch (err: any) {
      if (err.name === 'ZodError') {
        return reply.code(400).send({ error: 'Validation Error', details: err.issues });
      }
      if (err.message === 'Product not found') {
        return reply.code(404).send({ error: 'Not Found', message: err.message });
      }
      throw err;
    }
  });

  // DELETE /api/products/:id
  app.delete('/:id', {
    preHandler: [app.authenticate, roleGuard(['ADMIN'])],
    schema: { params: productIdParamSchema },
  }, async (request, reply) => {
    try {
      const result = await ProductService.delete(request.params.id);
      return reply.code(200).send(result);
    } catch (err: any) {
      if (err.message === 'Product not found') {
        return reply.code(404).send({ error: 'Not Found', message: err.message });
      }
      throw err;
    }
  });
}