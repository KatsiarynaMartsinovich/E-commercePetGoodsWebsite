import { request } from "./client";

export const cartApi = {
  get: () => request("/api/cart"),

  addItem: (productId, quantity = 1) =>
    request("/api/cart/items", {
      method: "POST",
      body: { productId, quantity },
    }),

  updateItem: (itemId, quantity) =>
    request(`/api/cart/items/${itemId}`, {
      method: "PATCH",
      body: { quantity },
    }),

  removeItem: (itemId) =>
    request(`/api/cart/items/${itemId}`, { method: "DELETE" }),

  applyPromo: (code) =>
    request("/api/cart/apply-promo", {
      method: "POST",
      body: { code },
    }),
};