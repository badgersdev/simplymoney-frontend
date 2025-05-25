import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
} from "@/lib/auth/auth";

const DJANGO_LOGIN_API_URL = `${process.env.DJANGO_API_BASE_URL}/token/pair`;

export async function POST(request) {
  const myAuthToken = await getToken();
  const myRefreshToken = await getRefreshToken();

  console.log("auth-token: ", myAuthToken);
  console.log("refresh-token: ", myRefreshToken);

  // catching request Data
  const requestData = await request.json();

  // converting request Data to json and POST to DJANGO API LOGIN for Pair token
  const jsonData = JSON.stringify(requestData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  const response = await fetch(DJANGO_LOGIN_API_URL, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    const { access, refresh } = responseData;
    console.log("Congrats! you are logged in!");

    setToken(access);
    setRefreshToken(refresh);
    return NextResponse.json({ isLoggedIn: true }, { status: 200 });
  }
  return NextResponse.json(
    { isLoggedIn: false, ...responseData },
    { status: 400 }
  );
}
