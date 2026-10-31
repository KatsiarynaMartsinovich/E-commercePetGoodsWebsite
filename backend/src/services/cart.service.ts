import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { calculateCartTotals } from '../utils/cart-totals.js';

function serializeCartItem(item: any) {
  return {
    id: item.id,
    quantity: item.quantity,
    product: {
      ...item.product,
      price: Number(item.product.price),
    },
  };
}

function serializeCart(cart: any, discountPercentage = 0) {
  const items = cart.items.map(serializeCartItem);
  const totals = calculateCartTotals(items, discountPercentage);
  return { id: cart.id, items, totals };
}

const cartInclude = {
  items: {
    include: { product: true },
    orderBy: { id: 'asc' as const },
  },
} satisfies Prisma.CartInclude;

export class CartService {
  private static async ensureCart(userId: string) {
    const existing = await prisma.cart.findUnique({ where: { userId } });
    if (existing) return existing;

    return prisma.cart.create({ data: { userId } });
  }

  //GET /api/cart
  static async getCart(userId: string) {
    const cart = await this.ensureCart(userId);

    const full = await prisma.cart.findUniqueOrThrow({
      where: { id: cart.id },
      include: cartInclude,
    });

    return serializeCart(full);
  }

  // POST /api/cart/items
  static async addItem(userId: string, productId: string, quantity: number) {
    const cart = await this.ensureCart(userId);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('PRODUCT_NOT_FOUND');

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    const nextQuantity = (existing?.quantity ?? 0) + quantity;
    if (nextQuantity > product.stockQuantity) {
      throw new Error('INSUFFICIENT_STOCK');
    }

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });

    return this.getCart(userId);
  }

  // PATCH /api/cart/items/:id
  static async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await this.ensureCart(userId);

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: true },
    });

    if (!item || item.cartId !== cart.id) {
      throw new Error('CART_ITEM_NOT_FOUND');
    }
    if (quantity > item.product.stockQuantity) {
      throw new Error('INSUFFICIENT_STOCK');
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return this.getCart(userId);
  }

  // DELETE /api/cart/items/:id
  static async removeItem(userId: string, itemId: string) {
    const cart = await this.ensureCart(userId);

    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item || item.cartId !== cart.id) {
      throw new Error('CART_ITEM_NOT_FOUND');
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    return this.getCart(userId);
  }

  // POST /api/cart/apply-promo
  static async applyPromo(
    userId: string,
    discountPercentage: number,
    promoCode: string,
  ) {
    const cart = await this.ensureCart(userId);

    const full = await prisma.cart.findUniqueOrThrow({
      where: { id: cart.id },
      include: cartInclude,
    });

    const result = serializeCart(full, discountPercentage);

    return {
      ...result,
      appliedPromo: {
        code: promoCode,
        discountPercentage,
      },
    };
  }
}