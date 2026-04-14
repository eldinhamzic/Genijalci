"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("staff@boravak.ba");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "Neispravan login");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center p-4">
      <form onSubmit={submit} className="card w-full space-y-4">
        <h1 className="text-2xl font-bold">Genijalci Boravak</h1>
        <p className="text-sm text-slate-600">Brzi login za osoblje i roditelje.</p>
        <label className="block text-sm font-medium">
          Email
          <input
            className="mt-1 w-full rounded-xl border p-3 text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Lozinka
          <input
            className="mt-1 w-full rounded-xl border p-3 text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</p>}
        <button className="big-btn w-full bg-indigo-600 text-white" disabled={loading}>
          {loading ? "Prijava..." : "Prijava"}
        </button>
        <p className="text-xs text-slate-500">Demo: staff@boravak.ba / demo1234</p>
      </form>
    </main>
  );
}
