const API_BASE_URT =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

function getToken(): string {
  return localStorage.getItem("lms-token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${API_BASE_URT}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request<any>("POST", "/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    request<any>("POST", "/auth/register", { name, email, password }),

  // Contents
  getContents: (params = "") => request<any>("GET", `/contents?${params}`),
  getContent: (id: string) => request<any>("GET", `/contents/${id}`),
  createContent: (data: unknown) => request<any>("POST", "/contents", data),
  updateContent: (id: string, data: unknown) =>
    request<any>("PUT", `/contents/${id}`, data),
  deleteContent: (id: string) => request<any>("DELETE", `/contents/${id}`),
};

export default api;
