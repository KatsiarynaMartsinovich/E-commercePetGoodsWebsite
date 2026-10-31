import { request } from "./client";

export const authApi = {
  register: (email, password) =>
    request("/api/auth/register", {
      method: "POST",
      auth: false,
      body: { email, password },
    }),

  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    }),
};