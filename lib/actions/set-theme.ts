'use server';

import { getSession } from '@/lib/auth/session';
import {
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  resolveTheme,
} from '@/lib/theme';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setTheme(formData: FormData) {
  const session = await getSession();

  if (!session?.user) {
    redirect('/');
  }

  const theme = resolveTheme(formData.get('theme')?.toString());
  const cookieStore = await cookies();

  cookieStore.set(THEME_COOKIE_NAME, theme, {
    httpOnly: true,
    maxAge: THEME_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/settings');
}
