import { request } from "./client";

export const productsApi = {
  list: (query) => request("/api/products", { query, auth: false }),
  getById: (id) => request(`/api/products/${id}`, { auth: false }),
};