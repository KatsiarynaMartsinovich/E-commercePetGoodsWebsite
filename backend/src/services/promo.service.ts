import { prisma } from '../lib/prisma.js';

export interface PromoValidationResult {
  code: string;
  discountPercentage: number;
}

export class PromoService {
  static async validate(code: string): Promise<PromoValidationResult> {
    const normalized = code.trim().toUpperCase();

    const promo = await prisma.promoCode.findUnique({
      where: { code: normalized },
    });

    if (!promo) {
      throw new Error('PROMO_NOT_FOUND');
    }
    if (!promo.isActive) {
      throw new Error('PROMO_INACTIVE');
    }

    return {
      code: promo.code,
      discountPercentage: promo.discountPercentage,
    };
  }
}