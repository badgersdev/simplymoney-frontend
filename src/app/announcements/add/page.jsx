import { ServerRequireAuth } from "@/lib/auth/ServerRequireAuth";
import AnnouncementForm from "@/components/announcements/AnnouncementForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AddAnnouncementPage() {
  await ServerRequireAuth();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dodaj Nowe Ogłoszenie</h1>

      <p className="text-muted-foreground mb-8">
        Uzupełnij informacje o produkcie lub usłudze, którą chcesz zaoferować.
      </p>

      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/announcements">⟵ Powrót do ogłoszeń</Link>
        </Button>
      </div>
      <div>
        <AnnouncementForm />
      </div>
    </div>
  );
}
