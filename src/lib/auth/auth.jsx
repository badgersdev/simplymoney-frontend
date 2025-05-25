import { cookies } from "next/headers";

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

//  API requests
export async function getToken() {
  const cookieStore = await cookies();

  const myAuthToken = cookieStore.get(TOKEN_NAME);
  return myAuthToken?.value;
}
export async function getRefreshToken() {
  const cookieStore = await cookies();

  const myRefreshToken = cookieStore.get(TOKEN_REFRESH_NAME);
  return myRefreshToken?.value;
}

// login
export async function setToken(authToken) {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, //IMPORTANT for security!!!. PREVENT JavaScript from seeing cookie
    secure: true,
    maxAge: TOKEN_AGE,
    sameSite: "none",
  });
}

export async function setRefreshToken(refreshToken) {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_REFRESH_NAME,
    value: refreshToken,
    httpOnly: true, //IMPORTANT for security!!!. PREVENT JavaScript from seeing cookie
    secure: true,
    maxAge: TOKEN_AGE,
    sameSite: "none",
  });
}

// logout
export async function deleteTokens() {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN_REFRESH_NAME);
  return cookieStore.delete(TOKEN_NAME);
}
