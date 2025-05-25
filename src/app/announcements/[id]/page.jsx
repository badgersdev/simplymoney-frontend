import AnnouncementDetail from "@/components/announcements/AnnouncementDetail";
import { notFound } from "next/navigation";

export default async function AnnouncementDetailPage({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/announcements/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();
  const announcement = await res.json();

  return (
    <main className="min-h-screen py-10 px-4 bg-gray-50">
      <AnnouncementDetail announcement={announcement} />
    </main>
  );
}
