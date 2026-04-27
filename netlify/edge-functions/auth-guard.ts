import { Context } from "https://edge.netlify.com";

const COOKIE_NAME = "lcs_session";
const LOGIN_PATH  = "/login";
const AUTH_PATH   = "/api/authenticate";

export default async function authGuard(request: Request, context: Context) {
  const url = new URL(request.url);

  // Always allow: login page, auth endpoint, and static assets
  if (
    url.pathname === LOGIN_PATH ||
    url.pathname === AUTH_PATH  ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.startsWith("/_vercel")
  ) {
    return context.next();
  }

  // Check session cookie
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [k, ...v] = c.trim().split("=");
      return [k.trim(), v.join("=")];
    })
  );

  const sessionToken = cookies[COOKIE_NAME];
  const secret       = Netlify.env.get("SESSION_SECRET") ?? "";
  const expected     = await hashToken(secret);

  if (sessionToken === expected) {
    return context.next();
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("from", url.pathname);
  return Response.redirect(loginUrl.toString(), 302);
}

async function hashToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data     = encoder.encode(secret);
  const hashBuf  = await crypto.subtle.digest("SHA-256", data);
  const hashArr  = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
}
