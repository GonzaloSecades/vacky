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
    <nav className="border-border/70 bg-background/88 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 border-b py-4 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8">
        <Link href={logoHref} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Vacky logo"
            width={50}
            height={50}
            className="border-border/70 h-11 w-11 rounded-full border bg-white/84 p-1.5 shadow-[0_10px_24px_rgba(73,58,104,0.1)]"
          />
          <div>
            <span className="text-foreground block font-serif text-2xl leading-none tracking-[-0.04em] md:text-[1.85rem]">
              Vacky
            </span>
            <span className="text-muted-foreground hidden text-xs font-semibold tracking-[0.18em] uppercase sm:block">
              Memories and planning
            </span>
          </div>
        </Link>
        {session && (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="border-border/80 bg-secondary/88 flex items-center gap-1 rounded-full border p-1 shadow-[0_10px_22px_rgba(73,58,104,0.08)]">
              <Link
                href="/trips"
                className="text-foreground hover:text-foreground rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-200 hover:bg-white sm:px-4 sm:text-sm"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-foreground hover:text-foreground rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-200 hover:bg-white sm:px-4 sm:text-sm"
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
