"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function AnnouncementDetail({ announcement }) {
  const images = announcement.images || [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-orange-600">
        {announcement.label}
      </h1>

      {/* SLIDER z SHADCN */}
      {images.length > 0 && (
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {images.map((imgUrl, index) => (
              <CarouselItem key={index}>
                <img
                  src={`http://127.0.0.1:8000${imgUrl}`}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-72 object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      )}

      <p className="text-muted-foreground">{announcement.description}</p>

      <div className="space-y-1">
        <p>
          <strong>Kategoria:</strong> {announcement.category}
        </p>
        <p>
          <strong>Typ wymiany:</strong> {announcement.exchange_type}
        </p>
        <p>
          <strong>Lokalizacja:</strong> {announcement.location}
        </p>
        <p>
          <strong>Rodzaj użytkownika:</strong> {announcement.seller_type}
        </p>

        {announcement.show_email && (
          <p>
            <strong>Email:</strong>{" "}
            <span className="text-green-700">{announcement.email}</span>
          </p>
        )}
        {announcement.show_phone && (
          <p>
            <strong>Telefon:</strong>{" "}
            <span className="text-green-700">{announcement.phone}</span>
          </p>
        )}
        <p className="text-sm text-gray-500">
          Dodano: {new Date(announcement.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
