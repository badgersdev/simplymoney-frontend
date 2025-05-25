import { fetchWithCookies } from "@/lib/fetchWithCookies";

const NEXT_API_WAITLIST_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/waitlist`;

export default async function WaitlistList() {
  const data = await fetchWithCookies(NEXT_API_WAITLIST_URL);

  if (!data || data.entries?.length === 0) {
    return <p className="text-muted-foreground">Brak oczekujących wpisów.</p>;
  }

  return (
    <div className="grid gap-4">
      {data.entries.map((entry) => (
        <div
          key={entry.id}
          className="border border-muted p-4 rounded-xl shadow-sm bg-background"
        >
          <div className="text-lg font-medium">{entry.label}</div>
          <div className="text-sm text-muted-foreground">
            {entry.email} —{" "}
            <span className="text-green-600 font-semibold">
              {entry.amount} zł
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
