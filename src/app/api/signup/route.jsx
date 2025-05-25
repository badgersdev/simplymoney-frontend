import { proxyRequest } from "@/lib/apiProxy";

export async function POST(request) {
  // const body = await req.json();

  // Tymczasowy log do testów
  // console.log("➡️ Signup request body:", body);

  // Tu docelowo użyjemy proxyRequest do Django
  return proxyRequest({
    request,
    method: "POST",
    djangoPath: "/api/auth/signup",
    sendJson: true,
  });
}
