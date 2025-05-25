"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

const NEXT_API_WAITLIST_URL = `${process.env.NEXT_PUBLIC_API_URL}/waitlist`;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, label, amount: parseFloat(amount) };
    console.log(data);

    try {
      const res = await fetch(NEXT_API_WAITLIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Wystąpił błąd");
        return;
      }

      router.push("/waitlist");
    } catch (err) {
      console.error(err);
      setError("Błąd sieci");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Tytuł zgłoszenia</Label>
        <Input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Kwota</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full">
        Dodaj do listy oczekujących
      </Button>
    </form>
  );
}
