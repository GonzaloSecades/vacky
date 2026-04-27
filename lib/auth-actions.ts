'use server';

import { destroyAppSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export const login = async () => {
  redirect('/sign-in');
};

export const logout = async () => {
  await destroyAppSession();
  redirect('/');
};
