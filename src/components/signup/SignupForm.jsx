"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

export default function SignupForm() {
  const router = useRouter();
  const { login } = useAuthContext(); // Dodajemy login z Contextu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    if (password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Błąd rejestracji.");
        return;
      }

      // 🧠 Jeśli dostaliśmy access i refresh token
      if (data.access && data.refresh) {
        // Zapisujemy tokeny w cookies za pomocą API Route
        await fetch("/api/set-tokens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access: data.access, refresh: data.refresh }),
        });

        login(); // Ustawiamy Context
        toast.success("Rejestracja Udana!");
        router.push("/waitlist"); // Przekierowanie na protected route
      } else {
        toast.error("Brak tokenów po rejestracji.");
      }
    } catch (err) {
      console.error("Błąd:", err);
      setError("Coś poszło nie tak...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>
    </form>
  );
}
