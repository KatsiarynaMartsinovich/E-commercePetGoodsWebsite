import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  addCartItemSchema,
  cartItemIdParamSchema,
  updateCartItemSchema,
  applyPromoSchema,
} from '../schemas/cart.schema.js';
import { CartService } from '../services/cart.service.js';
import { PromoService } from '../services/promo.service.js';

function handleCartError(err: any, reply: any) {
  switch (err.message) {
    case 'PRODUCT_NOT_FOUND':
      return reply.code(404).send({ error: 'Not Found', message: 'Товар не найден' });
    case 'CART_ITEM_NOT_FOUND':
      return reply.code(404).send({ error: 'Not Found', message: 'Позиция корзины не найдена' });
    case 'INSUFFICIENT_STOCK':
      return reply.code(409).send({ error: 'Conflict', message: 'Недостаточно товара на складе' });
    case 'PROMO_NOT_FOUND':
      return reply.code(404).send({ error: 'Not Found', message: 'Промокод не найден' });
    case 'PROMO_INACTIVE':
      return reply.code(400).send({ error: 'Bad Request', message: 'Промокод неактивен' });
    default:
      throw err;
  }
}

const cartProductSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  rating: z.number(),
  images: z.array(z.string()),
  stockQuantity: z.number(),
  createdAt: z.date(),
});

const cartItemResponseSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  product: cartProductSchema,
});

const cartTotalsSchema = z.object({
  subtotal: z.number(),
  discountPercentage: z.number(),
  discountAmount: z.number(),
  total: z.number(),
});

const cartResponseSchema = z.object({
  id: z.string().uuid(),
  items: z.array(cartItemResponseSchema),
  totals: cartTotalsSchema,
});

const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export default async function cartRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.addHook('preHandler', app.authenticate);

  // GET /api/cart
  app.get('/', {
    schema: {
      tags: ['Cart'],
      summary: 'Получить корзину текущего пользователя',
      description: 'Создаёт корзину при первом обращении, если её ещё нет.',
      security: [{ BearerAuth: [] }],
      response: {
        200: cartResponseSchema,
        401: errorSchema,
      },
    },
  }, async (request) => {
    return CartService.getCart(request.user.id);
  });

  // POST /api/cart/items
  app.post('/items', {
    schema: {
      tags: ['Cart'],
      summary: 'Добавить товар в корзину',
      description: 'Если товар уже есть — увеличивает количество. Проверяет остаток на складе.',
      security: [{ BearerAuth: [] }],
      body: addCartItemSchema,
      response: {
        201: cartResponseSchema,
        400: z.object({ error: z.string(), message: z.string().optional(), details: z.any().optional() }),
        401: errorSchema,
        404: errorSchema,
        409: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const { productId, quantity } = request.body;
      const cart = await CartService.addItem(request.user.id, productId, quantity);
      return reply.code(201).send(cart);
    } catch (err: any) {
      return handleCartError(err, reply);
    }
  });

  // PATCH /api/cart/items/:id
  app.patch('/items/:id', {
    schema: {
      tags: ['Cart'],
      summary: 'Изменить количество товара в корзине',
      security: [{ BearerAuth: [] }],
      params: cartItemIdParamSchema,
      body: updateCartItemSchema,
      response: {
        200: cartResponseSchema,
        400: z.object({ error: z.string(), message: z.string().optional(), details: z.any().optional() }),
        401: errorSchema,
        404: errorSchema,
        409: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const cart = await CartService.updateItem(
        request.user.id,
        request.params.id,
        request.body.quantity,
      );
      return reply.send(cart);
    } catch (err: any) {
      return handleCartError(err, reply);
    }
  });

  // DELETE /api/cart/items/:id
  app.delete('/items/:id', {
    schema: {
      tags: ['Cart'],
      summary: 'Удалить товар из корзины',
      security: [{ BearerAuth: [] }],
      params: cartItemIdParamSchema,
      response: {
        200: cartResponseSchema,
        401: errorSchema,
        404: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const cart = await CartService.removeItem(request.user.id, request.params.id);
      return reply.send(cart);
    } catch (err: any) {
      return handleCartError(err, reply);
    }
  });

  // POST /api/cart/apply-promo
  app.post('/apply-promo', {
    schema: {
      tags: ['Cart'],
      summary: 'Применить промокод',
      description: 'Валидирует промокод и рассчитывает итоговую стоимость со скидкой.',
      security: [{ BearerAuth: [] }],
      body: applyPromoSchema,
      response: {
        200: cartResponseSchema.extend({
          appliedPromo: z.object({
            code: z.string(),
            discountPercentage: z.number(),
          }),
        }),
        400: errorSchema,
        401: errorSchema,
        404: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const promo = await PromoService.validate(request.body.code);
      const result = await CartService.applyPromo(
        request.user.id,
        promo.discountPercentage,
        promo.code,
      );
      return reply.send(result);
    } catch (err: any) {
      return handleCartError(err, reply);
    }
  });
}