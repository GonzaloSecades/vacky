import { createAppSession } from '@/lib/auth/session';
import { hashOpaqueToken } from '@/lib/auth/email-verification';
import { verifyEmailToken } from '@/lib/spacetimedb/auth';
import { NextResponse } from 'next/server';

function redirectWithParams(
  request: Request,
  pathname: string,
  params: Record<string, string>
) {
  const url = new URL(pathname, request.url);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token')?.trim();

  if (!token) {
    return redirectWithParams(request, '/verify-email', {
      error: 'Verification token is missing.',
    });
  }

  const result = await verifyEmailToken(hashOpaqueToken(token));

  if (!result.ok || !result.userId) {
    return redirectWithParams(request, '/verify-email', {
      error: result.reason ?? 'Verification failed.',
      email: result.email ?? '',
    });
  }

  await createAppSession(result.userId);

  return NextResponse.redirect(new URL('/trips', request.url));
}
