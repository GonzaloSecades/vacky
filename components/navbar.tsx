import UserMenu from '@/components/user-menu';
import type { AppSession } from '@/lib/auth/session';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ session }: { session: AppSession | null }) => {
  const logoHref = session ? '/trips' : '/';

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/88 py-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8">
        <Link href={logoHref} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Vacky logo"
            width={50}
            height={50}
            className="h-11 w-11 rounded-full border border-border/70 bg-white/80 p-1.5 shadow-[0_8px_24px_rgba(31,31,31,0.08)]"
          />
          <div>
            <span className="block text-xl font-bold tracking-[-0.03em] text-foreground md:text-2xl">
              Vacky
            </span>
            <span className="hidden text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase sm:block">
              Trip memories, mapped
            </span>
          </div>
        </Link>
        {session && (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1 rounded-full border border-border/80 bg-white/80 p-1 shadow-[0_10px_22px_rgba(31,31,31,0.06)]">
              <Link
                href="/trips"
                className="rounded-full px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground sm:px-4 sm:text-sm"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="rounded-full px-3 py-2 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground sm:px-4 sm:text-sm"
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
          <Button asChild size="sm" className="cursor-pointer">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
