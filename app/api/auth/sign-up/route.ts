import { createEmailVerificationToken } from '@/lib/auth/email-verification';
import { hashPassword } from '@/lib/auth/password';
import { sendVerificationEmail } from '@/lib/email/send-verification-email';
import {
  getUserAuthByEmail,
  registerUserAccount,
} from '@/lib/spacetimedb/auth';
import { NextResponse } from 'next/server';

const SEE_OTHER_STATUS = 303;

function isDuplicateEmailError(error: unknown) {
  return (
    error instanceof Error &&
    error.message === 'A user with this email already exists'
  );
}

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

function readString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? '';
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = readString(formData, 'fullName');
  const country = readString(formData, 'country');
  const email = readString(formData, 'email').toLowerCase();
  const password = formData.get('password')?.toString() ?? '';

  if (!fullName || !country || !email || !password) {
    return redirectWithParams(request, '/sign-up', {
      error: 'All fields are required.',
      fullName,
      country,
      email,
    });
  }

  if (password.length < 8) {
    return redirectWithParams(request, '/sign-up', {
      error: 'Password must be at least 8 characters long.',
      fullName,
      country,
      email,
    });
  }

  const existingUser = await getUserAuthByEmail(email);
  if (existingUser) {
    return redirectWithParams(request, '/sign-in', {
      message: 'Account already exists. Sign in instead.',
      email,
    });
  }

  const passwordHash = await hashPassword(password);
  const verification = createEmailVerificationToken();

  try {
    await registerUserAccount({
      email,
      fullName,
      country,
      passwordHash,
      verificationTokenHash: verification.tokenHash,
      verificationExpiresAt: verification.expiresAt,
    });
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      return redirectWithParams(request, '/sign-in', {
        message: 'Account already exists. Sign in instead.',
        email,
      });
    }

    throw error;
  }

  await sendVerificationEmail({
    email,
    token: verification.rawToken,
  });

  return redirectWithParams(request, '/verify-email', { email });
}
