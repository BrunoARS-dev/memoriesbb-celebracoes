"use client";

import { useState, type FormEvent } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/gallery/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Não foi possível entrar.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível entrar.");
      setLoading(false);
    }
  }

  return (
    <main className="gallery-admin-login">
      <form onSubmit={handleSubmit}>
        <p className="brand-mark gallery-admin-brand">MB</p>
        <h1>Gestão da galeria</h1>
        <p>Área reservada para a MemoriesBB.</p>
        <label htmlFor="admin-password">Senha administrativa</label>
        <input id="admin-password" name="password" type="password" autoComplete="current-password" required minLength={12} />
        {error ? <p className="gallery-admin-error" role="alert">{error}</p> : null}
        <button type="submit" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>
      </form>
    </main>
  );
}
