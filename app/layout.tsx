import Navbar from '@/components/navbar';
import { getOptionalSession } from '@/lib/auth/session';
import { THEME_COOKIE_NAME, resolveTheme } from '@/lib/theme';
import type { Metadata } from 'next';
import { DM_Serif_Display, Geist_Mono, Manrope } from 'next/font/google';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vacky',
  description: 'Travel memories and trip planning in one place.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await getOptionalSession();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE_NAME)?.value);

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSerifDisplay.variable} ${geistMono.variable} h-full antialiased ${theme === 'dark' ? 'dark' : ''}`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Navbar session={session} />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
