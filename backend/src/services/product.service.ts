import { Prisma } from '@prisma/client';
import { Redis } from 'ioredis';
import { prisma } from '../lib/prisma.js';
import {
  buildProductCacheKey,
  getCache,
  setCache,
  invalidatePattern,
} from '../lib/cache.js';
import {
  ProductListQuery,
  ProductCreateInput,
  ProductUpdateInput,
} from '../schemas/product.schema.js';
import { buildPaginationMeta, buildSkipTake } from '../utils/pagination.js';

function serializeProduct(p: any) {
  return {
    ...p,
    price: Number(p.price),
  };
}

export class ProductService {
  static async list(redis: Redis, query: ProductListQuery) {
    const {
      page,
      limit,
      search,
      min_price,
      max_price,
      min_rating,
      sort_by,
      order,
    } = query;

    const cacheKey = buildProductCacheKey(query as Record<string, unknown>);

    const cached = await getCache<{ items: any[]; meta: any }>(redis, cacheKey);
    if (cached) {
      return cached;
    }

    const where: Prisma.ProductWhereInput = {
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...((min_price !== undefined || max_price !== undefined)
        ? {
            price: {
              ...(min_price !== undefined ? { gte: new Prisma.Decimal(min_price) } : {}),
              ...(max_price !== undefined ? { lte: new Prisma.Decimal(max_price) } : {}),
            },
          }
        : {}),
      ...(min_rating !== undefined ? { rating: { gte: min_rating } } : {}),
    };

    const { skip, take } = buildSkipTake(page, limit);

    const [items, totalItems] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy: { [sort_by]: order },
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    const result = {
      items: items.map(serializeProduct),
      meta: buildPaginationMeta(totalItems, page, limit),
    };

    await setCache(redis, cacheKey, result);

    return result;
  }

  static async getById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Product not found');
    return serializeProduct(product);
  }

  static async create(redis: Redis, data: ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        rating: data.rating,
        images: data.images,
        stockQuantity: data.stockQuantity,
      },
    });

    await invalidatePattern(redis, 'products:*');

    return serializeProduct(product);
  }

  static async update(redis: Redis, id: string, data: ProductUpdateInput) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error('Product not found');

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.price !== undefined ? { price: new Prisma.Decimal(data.price) } : {}),
        ...(data.rating !== undefined ? { rating: data.rating } : {}),
        ...(data.images !== undefined ? { images: data.images } : {}),
        ...(data.stockQuantity !== undefined ? { stockQuantity: data.stockQuantity } : {}),
      },
    });

    await invalidatePattern(redis, 'products:*');

    return serializeProduct(product);
  }

  static async delete(redis: Redis, id: string) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error('Product not found');

    await prisma.$transaction([
      prisma.cartItem.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);

    await invalidatePattern(redis, 'products:*');

    return { id };
  }
}