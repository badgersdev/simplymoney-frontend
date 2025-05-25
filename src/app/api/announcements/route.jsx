import { getToken } from "@/lib/auth/auth";
import { proxyRequest } from "@/lib/apiProxy";
import { NextResponse } from "next/server";

export async function POST(request) {
  // try {
  //   const authToken = await getToken();
  //   // const body = await request.json();

  //   if (!authToken) {
  //     return NextResponse.json(
  //       { message: "Brak Tokena uwierzytelniającego." },
  //       { status: 401 }
  //     );
  //   }

  //   const formData = await request.formData();

  //   const res = await fetch(DJANGO_ANNOUNCEMENTS_API_URL, {
  //     method: "POST",
  //     headers: {
  //       // NIE DODAWAĆ "Content-Type": "application/json"
  //       // PRZEGLĄDARKA SAMA USTAWI NAGŁÓWEK multipart/form-data z uwagi na to, że przesyłamy pliki
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //     body: formData,
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     return NextResponse.json(
  //       { message: data?.detail || "Błąd serwera" },
  //       { status: res.status }
  //     );
  //   }

  //   return NextResponse.json(data, { status: 200 });
  // } catch (error) {
  //   console.log("BŁĄD API ROUTE", error);
  //   return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  // }
  return proxyRequest({
    request,
    method: "POST",
    djangoPath: `/api/announcements/`,
    withAuth: true,
    sendJson: false,
  });
}

export async function GET(request) {
  const search = new URL(request.url).search;
  // const { searchParams } = new URL(request.url);
  // const q = searchParams.get("q");
  // const url = q
  //   ? `${DJANGO_ANNOUNCEMENTS_API_URL}?q=${encodeURIComponent(q)}`
  //   : DJANGO_ANNOUNCEMENTS_API_URL;

  // try {
  //   const res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     cache: "no-store",
  //   });

  //   const data = await res.json();

  //   if (!res.ok) {
  //     return NextResponse.json(
  //       { message: "Błąd Pobierania ogłoszeń..." },
  //       { status: res.status }
  //     );
  //   }

  //   return NextResponse.json(data, { status: 200 });
  // } catch (error) {
  //   console.log("Błąd podczas pobierania ogłoszeń: ", error);
  //   return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  // }

  return proxyRequest({
    request,
    method: "GET",
    djangoPath: `/api/announcements${search}`,
  });
}
