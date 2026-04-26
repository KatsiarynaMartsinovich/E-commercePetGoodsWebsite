export const validatePromoCode = (code) => {
  if (!code || !code.trim()) {
    return { status: "empty" };
  }

  const normalized = code.trim().toUpperCase();

  if (normalized === "SAVE10") {
    return {
      status: "valid",
      discount: 0.1,
    };
  }

  return { status: "invalid" };
};