import api from "./axios";

export async function signup(payload) {
  const res = await api.post("/api/auth/signup", payload);
  return res.data;
}

export async function login(payload) {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
}
