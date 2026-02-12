import { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow p-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-slate-500 mt-1">Login to continue.</p>

        {err && <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{err}</div>}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-xl border p-3 outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full rounded-xl border p-3 outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              type="password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-4">
          New here?{" "}
          <Link className="font-medium underline" to="/signup">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
