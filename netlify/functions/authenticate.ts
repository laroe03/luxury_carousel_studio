import type { Handler } from "@netlify/functions";

const COOKIE_NAME    = "lcs_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body          = new URLSearchParams(event.body ?? "");
  const inputPassword = body.get("password") ?? "";
  const redirectTo    = body.get("from")     ?? "/studio";

  const correctPassword = process.env.SITE_PASSWORD ?? "";
  const secret          = process.env.SESSION_SECRET ?? "";

  if (!inputPassword || inputPassword !== correctPassword) {
    return {
      statusCode: 302,
      headers: {
        Location: `/login?error=1&from=${encodeURIComponent(redirectTo)}`,
      },
      body: "",
    };
  }

  const token = await hashToken(secret);

  return {
    statusCode: 302,
    headers: {
      Location: redirectTo,
      "Set-Cookie": [
        `${COOKIE_NAME}=${token}`,
        "Path=/",
        `Max-Age=${COOKIE_MAX_AGE}`,
        "HttpOnly",
        "SameSite=Lax",
        "Secure",
      ].join("; "),
    },
    body: "",
  };
};

async function hashToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data     = encoder.encode(secret);
  const hashBuf  = await globalThis.crypto.subtle.digest("SHA-256", data);
  const hashArr  = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
}
