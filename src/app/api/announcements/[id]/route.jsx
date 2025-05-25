import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const url = `${process.env.DJANGO_API_BASE_URL}/announcements/${id}/`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: "Błąd pobierania danych" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd Pobierania danych z serwera" },
      { status: 500 }
    );
  }
}
