export async function GET(request) {
  const baseUrl = process.env.DJANGO_API_BASE_URL;
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Brak tokena uwierzytelniającego." }),
      { status: 401 }
    );
  }

  const res = await fetch(`${baseUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  return new Response(isJson ? JSON.stringify(data) : data, {
    status: res.status,
    headers: { "Content-Type": isJson ? "application/json" : "text/plain" },
  });
}
