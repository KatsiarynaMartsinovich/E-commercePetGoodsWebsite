export const TAX_RATE = 0.08;

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

export const calculateOrderTotals = (totals) => {
  const tax = round2(totals.subtotal * TAX_RATE);
  const grandTotal = round2(totals.total + tax);

  return { tax, grandTotal };
};