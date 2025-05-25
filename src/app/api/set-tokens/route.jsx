import { setToken, setRefreshToken } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { access, refresh } = await request.json();

  if (!access || !refresh) {
    return NextResponse.json({ message: "Brak tokenów" }, { status: 400 });
  }

  await setToken(access);
  await setRefreshToken(refresh);

  return NextResponse.json({ message: "Tokeny zapisane" }, { status: 200 });
}
