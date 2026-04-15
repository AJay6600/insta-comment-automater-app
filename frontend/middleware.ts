// middleware.ts
export default function middleware(request: Request) {
  const authHeader = request.headers.get("authorization");

  const USERNAME = "admin";
  const PASSWORD = "123456";

  if (authHeader) {
    const encoded = authHeader.split(" ")[1];
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === USERNAME && pass === PASSWORD) {
      return;
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted"',
    },
  });
}

export const config = {
  matcher: "/(.*)",
};
