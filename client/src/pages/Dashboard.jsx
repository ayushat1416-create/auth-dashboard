import { useEffect, useState } from "react";
import { getMe, updateMe, uploadAvatar } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    try {
      const data = await getMe();
      setUser(data.user);
      setName(data.user.name || "");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSave() {
    setStatus("");
    try {
      const data = await updateMe({ name });
      setUser(data.user);
      setStatus("✅ Profile updated");
    } catch (err) {
      setStatus(err?.response?.data?.message || "Update failed");
    }
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("");
    try {
      const data = await uploadAvatar(file);
      setUser(data.user);
      setStatus("✅ Avatar uploaded");
    } catch (err) {
      setStatus(err?.response?.data?.message || "Upload failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (loading) {
    return <div className="min-h-screen grid place-items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button onClick={logout} className="rounded-xl bg-white border px-4 py-2">
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white shadow p-6">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-slate-500 text-sm mt-1">Update your basic information.</p>

            <div className="mt-5">
              <label className="text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full rounded-xl border p-3 outline-none focus:ring"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full rounded-xl border p-3 bg-slate-50"
                value={user?.email || ""}
                disabled
              />
            </div>

            <button
              onClick={onSave}
              className="mt-5 w-full rounded-xl bg-black text-white py-3 font-medium"
            >
              Save Changes
            </button>

            {status && <div className="mt-4 text-sm text-slate-700">{status}</div>}
          </div>

          <div className="rounded-2xl bg-white shadow p-6">
            <h2 className="text-lg font-semibold">Profile Picture</h2>
            <p className="text-slate-500 text-sm mt-1">Upload a JPG/PNG/WEBP (max 2MB).</p>

            <div className="mt-5 flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-200 grid place-items-center">
                {user?.avatarUrl ? (
                  <img
                    src={`http://localhost:5000${user.avatarUrl}`}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-slate-600 text-sm">No photo</span>
                )}
              </div>

              <label className="cursor-pointer rounded-xl border bg-white px-4 py-2">
                Choose file
                <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              </label>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Tip: after upload, refresh will still show image because it’s saved in DB.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
