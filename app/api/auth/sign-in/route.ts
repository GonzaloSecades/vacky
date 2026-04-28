import { verifyPassword } from '@/lib/auth/password';
import { createAppSession } from '@/lib/auth/session';
import { getUserAuthByEmail } from '@/lib/spacetimedb/auth';
import { NextResponse } from 'next/server';

const SEE_OTHER_STATUS = 303;

function redirectWithParams(
  request: Request,
  pathname: string,
  params: Record<string, string>
) {
  const url = new URL(pathname, request.url);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return NextResponse.redirect(url, SEE_OTHER_STATUS);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  if (!email || !password) {
    return redirectWithParams(request, '/sign-in', {
      error: 'Email and password are required.',
      email,
    });
  }

  const user = await getUserAuthByEmail(email);
  if (!user) {
    return redirectWithParams(request, '/sign-in', {
      error: 'Invalid email or password.',
      email,
    });
  }

  const passwordMatches = await verifyPassword(user.passwordHash, password);
  if (!passwordMatches) {
    return redirectWithParams(request, '/sign-in', {
      error: 'Invalid email or password.',
      email,
    });
  }

  if (!user.emailVerifiedAt) {
    return redirectWithParams(request, '/verify-email', {
      email: user.email,
      error: 'Verify your email before signing in.',
    });
  }

  await createAppSession(user.id);

  return NextResponse.redirect(new URL('/trips', request.url), SEE_OTHER_STATUS);
}
