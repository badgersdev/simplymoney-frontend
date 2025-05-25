import { cookies } from "next/headers";

export async function proxyRequest({
  request,
  djangoPath,
  method = "GET",
  withAuth = false,
  sendJson = false,
}) {
  // const baseUrl = process.env.DJANGO_API_BASE_URL || "http://127.0.0.1:8000";
  const baseUrl = process.env.DJANGO_API_BASE_URL;
  const url = `${baseUrl}${djangoPath}`;
  const headers = {};

  if (withAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Brak tokena uwierzytelniającego." }),
        { status: 401 }
      );
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (sendJson) {
    headers["Content-Type"] = "application/json";
  }

  let body = null;
  if (method === "POST" || method === "PUT") {
    if (!sendJson) {
      body = await request.formData();
    } else {
      const rawBody = await request.text();
      body = rawBody;
    }
  }
  const res = await fetch(url, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const contentType = res.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  return new Response(isJson ? JSON.stringify(data) : data, {
    status: res.status,
    headers: { "Content-Type": isJson ? "application/json" : "text/plain" },
  });
}
