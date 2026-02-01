import Cookies from "js-cookie";

const API_BASE = "http://localhost:4000/api";

const request = async (url: string, options: RequestInit = {}) => {
  const token = Cookies.get("accessToken");
  const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  const res = await fetch(API_BASE + url, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getTasks = async ({
  page = 1,
  limit = 10,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  status?: "true" | "false" | "";
  search?: string;
} = {}) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  return request(`/tasks?${params.toString()}`);
};

export const createTask = (title: string) =>
  request("/tasks", { method: "POST", body: JSON.stringify({ title }) });

export const toggleTask = (id: string) =>
  request(`/tasks/${id}/toggle`, { method: "PATCH" });

export const updateTask = (id: string, title: string) =>
  request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ title }) });


export const deleteTask = (id: string) =>
  request(`/tasks/${id}`, { method: "DELETE" });
