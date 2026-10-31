import { FastifyInstance, FastifyRequest } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
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

const productResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number(),
  images: z.array(z.string()),
  stockQuantity: z.number(),
  createdAt: z.coerce.date(),
});

const paginationMetaSchema = z.object({
  total_items: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  limit: z.number(),
});

export default async function productRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // GET /api/products
  app.get('/', {
    schema: {
      tags: ['Products'],
      summary: 'Каталог товаров с фильтрацией, сортировкой и пагинацией',
      description: 'Все операции выполняются на уровне БД. Результат кэшируется в Redis на 90 секунд.',
      querystring: productListQuerySchema,
      response: {
        200: z.object({
          items: z.array(productResponseSchema),
          meta: paginationMetaSchema,
        }),
        400: z.object({
          error: z.string(),
          message: z.string().optional(),
          details: z.any().optional(),
        }),
      },
    },
  }, async (request) => {
    return ProductService.list(app.redis, request.query);
  });

  // GET /api/products/:id
  app.get('/:id', {
    schema: {
      tags: ['Products'],
      summary: 'Получить товар по ID',
      params: productIdParamSchema,
      response: {
        200: productResponseSchema,
        404: z.object({
          error: z.string(),
          message: z.string(),
        }),
      },
    },
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
    schema: {
      tags: ['Products (Admin)'],
      summary: 'Создать товар (только ADMIN)',
      description: 'Поддерживает JSON с готовыми URL изображений или multipart/form-data с загрузкой файлов в Supabase Storage.',
      security: [{ BearerAuth: [] }],
      response: {
        201: productResponseSchema,
        400: z.object({
          error: z.string(),
          message: z.string().optional(),
          details: z.any().optional(),
        }),
        401: z.object({
          error: z.string(),
          message: z.string(),
        }),
        403: z.object({
          error: z.string(),
          message: z.string(),
        }),
      },
    },
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

      const product = await ProductService.create(app.redis, data);
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
    schema: {
      tags: ['Products (Admin)'],
      summary: 'Обновить товар (только ADMIN)',
      security: [{ BearerAuth: [] }],
      params: productIdParamSchema,
      body: productUpdateSchema,
      response: {
        200: productResponseSchema,
        400: z.object({
          error: z.string(),
          message: z.string().optional(),
          details: z.any().optional(),
        }),
        401: z.object({
          error: z.string(),
          message: z.string(),
        }),
        403: z.object({
          error: z.string(),
          message: z.string(),
        }),
        404: z.object({
          error: z.string(),
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    try {
      const data = productUpdateSchema.parse(request.body);
      const product = await ProductService.update(app.redis, request.params.id, data);
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
    schema: {
      tags: ['Products (Admin)'],
      summary: 'Удалить товар (только ADMIN)',
      description: 'Удаляет связанные cart_item и сам товар. Сбрасывает кэш каталога.',
      security: [{ BearerAuth: [] }],
      params: productIdParamSchema,
      response: {
        200: z.object({ id: z.string().uuid() }),
        401: z.object({
          error: z.string(),
          message: z.string(),
        }),
        403: z.object({
          error: z.string(),
          message: z.string(),
        }),
        404: z.object({
          error: z.string(),
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    try {
      const result = await ProductService.delete(app.redis, request.params.id);
      return reply.code(200).send(result);
    } catch (err: any) {
      if (err.message === 'Product not found') {
        return reply.code(404).send({ error: 'Not Found', message: err.message });
      }
      throw err;
    }
  });
}