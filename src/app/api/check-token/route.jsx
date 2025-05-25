import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  // console.log(token);

  if (!token) {
    return NextResponse.json({ message: "Brak tokena" }, { status: 401 });
  }

  try {
    // console.log(process.env.NEXT_PUBLIC_SECRET_KEY);
    // console.log("🚀 TEST:", process.env.NEXT_PUBLIC_SECRET_KEY);

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Token wygasł lub nieprawidłowy" },
      { status: 401 }
    );
  }
}
