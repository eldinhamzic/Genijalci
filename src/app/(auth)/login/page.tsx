"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEMO_EMAIL = "staff@boravak.ba";
const DEMO_PASSWORD = "demo1234";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Neispravni demo podaci");
      return;
    }

    setLoading(true);
    router.push("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center p-4">
      <form onSubmit={submit} className="card w-full space-y-4">
        <h1 className="text-2xl font-bold">Genijalci Boravak</h1>
        <p className="text-sm text-slate-600">Brzi login za osoblje.</p>
        <label className="block text-sm font-medium">
          Email
          <input
            className="mt-1 w-full rounded-xl border p-3 text-base"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Lozinka
          <input
            className="mt-1 w-full rounded-xl border p-3 text-base"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button className="big-btn w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={loading}>
          {loading ? "Prijava..." : "Prijava"}
        </button>
        <p className="text-xs text-slate-500">Demo: staff@boravak.ba / demo1234</p>
      </form>
    </main>
  );
}
