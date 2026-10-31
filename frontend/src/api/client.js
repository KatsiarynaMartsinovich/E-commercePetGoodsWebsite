import { API_URL } from "../config";

const TOKEN_KEY = "token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

let unauthorizedHandler = null;
export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const buildQuery = (query) => {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });
  const str = params.toString();
  return str ? `?${str}` : "";
};

const extractMessage = (data, status) => {
  if (Array.isArray(data?.details) && data.details.length > 0) {
    const text = data.details
      .map((d) => d.message)
      .filter(Boolean)
      .join("; ");
    if (text) return text;
  }
  return data?.message || `Ошибка запроса (${status})`;
};

export async function request(
  path,
  { method = "GET", body, query, auth = true } = {}
) {
  const headers = {};
  const token = auth ? tokenStorage.get() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}${buildQuery(query)}`, {
      method,
      headers,
      body: payload,
    });
  } catch {
    throw new ApiError(0, "Сервер недоступен. Проверьте, что бэкенд запущен.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token && unauthorizedHandler) {
      unauthorizedHandler();
    }
    throw new ApiError(
      response.status,
      extractMessage(data, response.status),
      data?.details
    );
  }

  return data;
}