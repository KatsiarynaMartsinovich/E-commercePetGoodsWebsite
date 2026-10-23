import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
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

export default async function cartRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.addHook('preHandler', app.authenticate);

  // GET /api/cart
  app.get('/', async (request) => {
    return CartService.getCart(request.user.id);
  });

  // POST /api/cart/items
  app.post('/items', {
    schema: { body: addCartItemSchema },
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
      params: cartItemIdParamSchema,
      body: updateCartItemSchema,
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
    schema: { params: cartItemIdParamSchema },
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
    schema: { body: applyPromoSchema },
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