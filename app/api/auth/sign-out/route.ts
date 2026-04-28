import { destroyAppSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await destroyAppSession();
  return NextResponse.redirect(new URL('/', request.url), 303);
}
