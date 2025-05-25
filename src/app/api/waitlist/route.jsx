import { getToken } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DJANGO_WAITLIST_API_URL = `${process.env.DJANGO_API_BASE_URL}/waitlist/`;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    console.log(authToken, "<< from route.jsx");

    if (!authToken) {
      console.log("🚫 Brak tokena!");
      return NextResponse.json(
        { message: "Brak uwierzytelnienia" },
        { status: 401 }
      );
    }

    const response = await fetch(DJANGO_WAITLIST_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    console.log("📦 Response from Django:", data);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Błąd uwierzytelniania" },
        { status: response.status }
      );
    }

    return NextResponse.json({ entries: data }, { status: 200 });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ message: "Błąd Serwera" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authToken = await getToken();

    if (!authToken) {
      return NextResponse.json(
        { message: "Brak uwierzytelnienia" },
        { status: 401 }
      );
    }
    // coming rom /WaitlistForm.jsx
    const body = await request.json();
    console.log(body);

    // sending our body to
    const response = await fetch(DJANGO_WAITLIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.detail || "Błąd podczas wysyłania danych" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("BŁĄD przy wysyłaniu danych do Django: ", error);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}
