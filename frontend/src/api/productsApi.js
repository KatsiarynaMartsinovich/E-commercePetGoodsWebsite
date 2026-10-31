import { request } from "./client";

export const productsApi = {
  list: (query) => request("/api/products", { query, auth: false }),
  getById: (id) => request(`/api/products/${id}`, { auth: false }),

  create: (payload) => request("/api/products", { method: "POST", body: payload }),
  update: (id, data) =>
    request(`/api/products/${id}`, { method: "PATCH", body: data }),
  remove: (id) => request(`/api/products/${id}`, { method: "DELETE" }),
};