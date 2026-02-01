import Cookies from "js-cookie";

const API_BASE = "http://localhost:4000/api"; // point to your backend

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return false;

    const data: { accessToken: string } = await res.json();
    Cookies.set("accessToken", data.accessToken);
    return true;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    return res.ok;
  } catch (err) {
    console.error("Register error:", err);
    return false;
  }
};

export const logout = () => {
  Cookies.remove("accessToken");
};

export const getUserFromToken = () => {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload.email };
  } catch {
    return null;
  }
};
