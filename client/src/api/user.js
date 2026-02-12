import api from "./axios";

export async function getMe() {
  const res = await api.get("/api/user/me");
  return res.data;
}

export async function updateMe(payload) {
  const res = await api.put("/api/user/me", payload);
  return res.data;
}

export async function uploadAvatar(file) {
  const form = new FormData();
  form.append("avatar", file);

  const res = await api.post("/api/user/me/avatar", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
