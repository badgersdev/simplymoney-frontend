import { cookies } from "next/headers";

export async function fetchWithCookies(url, options = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    throw new Error("Brak auth-token w cookies");
  }

  const headers = {
    ...options.headers,
    Cookie: `auth-token=${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("🔴 Błąd fetchWithCookies:", text);
    throw new Error("Błąd podczas pobierania danych");
  }

  return res.json();
}
