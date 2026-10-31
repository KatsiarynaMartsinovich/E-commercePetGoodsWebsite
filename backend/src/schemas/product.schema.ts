import { z } from 'zod';

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  search: z.string().trim().min(1).optional(),
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  min_rating: z.coerce.number().min(0).max(5).optional(),
  sort_by: z.enum(['price', 'title']).default('title'),
  order: z.enum(['asc', 'desc']).default('asc'),
}).refine(
  (q) => !(q.min_price !== undefined && q.max_price !== undefined && q.min_price > q.max_price),
  { message: 'min_price не может быть больше max_price', path: ['min_price'] },
);

export type ProductListQuery = z.infer<typeof productListQuerySchema>;

export const productIdParamSchema = z.object({
  id: z.string().uuid('Некорректный id товара'),
});

export const productCreateSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  rating: z.coerce.number().min(0).max(5).default(0),
  images: z.array(z.string().url()).min(3, 'Нужно минимум 3 изображения'),
  stockQuantity: z.coerce.number().int().min(0),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;