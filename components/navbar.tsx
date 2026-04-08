import UserMenu from '@/components/user-menu';
import { login } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';
import type { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { GithubSvg } from './githubSvg';

const Navbar = ({ session }: { session: Session | null }) => {
  const logoHref = session ? '/trips' : '/';

  return (
    <nav className="relative z-50 border-b border-border bg-background/95 py-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
        <Link href={logoHref} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
          />
          <span className="text-2xl font-bold text-foreground">Vacky</span>
        </Link>
        {session && (
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/trips"
                className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary sm:text-base"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary sm:text-base"
              >
                Globe
              </Link>
            </div>
            <UserMenu
              userEmail={session.user?.email}
              userImage={session.user?.image}
              userName={session.user?.name}
            />
          </div>
        )}

        {!session && (
          <form action={login}>
            <Button type="submit" size="sm" className="cursor-pointer">
              Sign In
              <GithubSvg />
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
