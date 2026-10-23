export interface CartLineLike {
  quantity: number;
  product: { price: unknown };
}

export interface CartTotals {
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  total: number;
}

export function calculateCartTotals(
  items: CartLineLike[],
  discountPercentage = 0,
): CartTotals {
  const subtotalRaw = items.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  const subtotal = round2(subtotalRaw);

  const safeDiscount = clamp(discountPercentage, 0, 100);
  const discountAmount = round2(subtotal * (safeDiscount / 100));
  const total = round2(subtotal - discountAmount);

  return {
    subtotal,
    discountPercentage: safeDiscount,
    discountAmount,
    total,
  };
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}