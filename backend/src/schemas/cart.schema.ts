import { z } from 'zod';

// POST /api/cart/items
export const addCartItemSchema = z.object({
  productId: z.string().uuid('Некорректный id товара'),
  quantity: z.coerce.number().int().min(1).max(999).default(1),
});

// PATCH /api/cart/items/:id
export const cartItemIdParamSchema = z.object({
  id: z.string().uuid('Некорректный id позиции корзины'),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(999),
});

// POST /api/cart/apply-promo
export const applyPromoSchema = z.object({
  code: z.string().trim().min(1, 'Код промокода обязателен').max(64),
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type ApplyPromoInput = z.infer<typeof applyPromoSchema>;