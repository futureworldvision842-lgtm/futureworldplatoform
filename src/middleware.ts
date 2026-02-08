import { auth } from "@/lib/auth";

export default auth((req) => {
  const isProtected =
    /^\/(dashboard|profile|teams|feed|wallet|voting|services|business|ai-assistant|notifications|settings|society|city|country|global|admin)/.test(
      req.nextUrl.pathname
    );
  if (isProtected && !req.auth) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/teams/:path*",
    "/feed/:path*",
    "/wallet/:path*",
    "/voting/:path*",
    "/services/:path*",
    "/business/:path*",
    "/ai-assistant/:path*",
    "/notifications/:path*",
    "/settings/:path*",
    "/society/:path*",
    "/city/:path*",
    "/country/:path*",
    "/global/:path*",
    "/admin/:path*",
  ],
};
