"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const query = debouncedSearch
        ? `?q=${encodeURIComponent(debouncedSearch)}`
        : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/announcements${query}`
      );
      const data = await res.json();
      setAnnouncements(data);
    };
    fetchData();
  }, [debouncedSearch]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Input
        placeholder="Wpisz miasto, produkt, kategorię..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300"
      />

      {announcements.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          Brak wyników wyszukiwania
        </p>
      ) : (
        announcements.map((a) => (
          <Card
            key={a.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            {a.images?.length > 0 && (
              <img
                src={`${process.env.NEXT_PUBLIC_DJANGO_MEDIA_URL}${a.images[0]}`}
                alt={a.label}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-5 space-y-1">
              <h2 className="text-xl font-semibold text-orange-600">
                {a.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                Lokalizacja: {a.location}
              </p>
              <p className="text-sm">
                Kategoria: <span className="text-green-600">{a.category}</span>
              </p>
              <p className="text-sm">Typ: {a.exchange_type}</p>
              <p className="text-sm">Użytkownik: {a.seller_type}</p>
              <p className="text-xs text-gray-500">
                Dodano: {new Date(a.timestamp).toLocaleString()}
              </p>
              <Link
                href={`/announcements/${a.id}`}
                className="inline-block mt-2 text-sm text-orange-600 hover:underline"
              >
                Zobacz szczegóły →
              </Link>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
