import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function ServerRequireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  return token;
}
