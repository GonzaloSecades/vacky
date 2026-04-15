import { auth } from '@/auth';
import Navbar from '@/components/navbar';
import { THEME_COOKIE_NAME, resolveTheme } from '@/lib/theme';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vacky',
  description: 'Your trip memory book',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await auth();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE_NAME)?.value);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${theme === 'dark' ? 'dark' : ''}`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
