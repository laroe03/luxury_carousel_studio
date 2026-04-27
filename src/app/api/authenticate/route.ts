import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'lcs_session';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

async function hashToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const inputPassword = params.get('password') ?? '';
  const redirectTo = params.get('from') ?? '/studio';

  const correctPassword = process.env.SITE_PASSWORD ?? '';
  const secret = process.env.SESSION_SECRET ?? '';

  if (!inputPassword || inputPassword !== correctPassword) {
    const url = new URL('/login', req.url);
    url.searchParams.set('error', '1');
    url.searchParams.set('from', redirectTo);
    return NextResponse.redirect(url, { status: 302 });
  }

  const token = await hashToken(secret);

  const response = NextResponse.redirect(new URL(redirectTo, req.url), { status: 302 });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
