import { NextResponse } from "next/server";
import { deleteTokens } from "@/lib/auth/auth";

export async function POST(request) {
  const TokenDeleteResponse = await deleteTokens();
  return NextResponse.json({}, { status: 200 });
}
