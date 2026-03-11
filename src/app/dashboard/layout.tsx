"use client";

import { useState, useEffect, FormEvent } from "react";

function LoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if we have a valid auth cookie by trying to fetch status
    // The cookie is httpOnly so we can't read it directly — just check via a
    // lightweight probe. We'll set authed based on cookie presence server-side
    // in middleware if we had one. For simplicity, store a client flag.
    const flag = sessionStorage.getItem("dashboard_authed");
    setAuthed(flag === "1");
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("dashboard_authed", "1");
        setAuthed(true);
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  // Loading state
  if (authed === null) {
    return (
      <div className="min-h-screen bg-ocean-dark flex items-center justify-center">
        <div className="text-foam/40 text-sm">Loading…</div>
      </div>
    );
  }

  // Login form
  if (!authed) {
    return (
      <div className="min-h-screen bg-ocean-dark flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg border border-ocean-light/30 bg-ocean-mid/50 p-6"
        >
          <h1 className="text-lg font-semibold text-foam mb-1">Bayside Ops</h1>
          <p className="text-sm text-foam/40 mb-6">Enter password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded border border-ocean-light/30 bg-ocean-dark/80 px-3 py-2 text-sm text-foam placeholder:text-foam/30 focus:border-bio focus:outline-none focus:ring-1 focus:ring-bio"
          />
          {error && <p className="text-xs text-coral mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded bg-bio px-4 py-2 text-sm font-semibold text-ocean-dark hover:bg-bio/90 disabled:opacity-40 transition-colors"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginGate>{children}</LoginGate>;
}
