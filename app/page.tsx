import { auth } from '@/auth';
import AuthButton from '@/components/auth-button';
import {
  CalendarRange,
  Compass,
  Globe2,
  MapPinned,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const featureBlocks = [
  {
    title: 'Image-first trips',
    description:
      'Cover images, polished cards, and softer surfaces make each trip feel like a place worth returning to.',
    icon: Compass,
  },
  {
    title: 'Day-by-day clarity',
    description:
      'Organize each stop by trip day, then revisit the plan with a cleaner itinerary rhythm and stronger actions.',
    icon: CalendarRange,
  },
  {
    title: 'Maps with intent',
    description:
      'Trip maps and the globe stay visual, while planner-heavy surfaces get faster, tighter utility chrome.',
    icon: MapPinned,
  },
];

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-border/70">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(255,90,95,0.2),transparent_48%)]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(47,128,237,0.12),transparent_68%)] blur-3xl" />
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 space-y-7">
              <div className="travel-kicker">
                <Sparkles className="size-3.5" />
                Airbnb warmth, planner clarity
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-bold tracking-[-0.06em] text-foreground md:text-7xl">
                  Trips that feel like memories before they even start.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  Build itineraries, save places, and move between discovery,
                  detail, and maps inside one polished travel workspace.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_16px_32px_rgba(255,90,95,0.28)] transition-all hover:-translate-y-px hover:bg-[var(--primary-strong)]"
                >
                  {isLoggedIn ? 'Open your trips' : 'Start with GitHub'}
                </AuthButton>
                <Link
                  href={isLoggedIn ? '/globe' : '#highlights'}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/80 px-6 text-sm font-semibold text-foreground shadow-[0_10px_22px_rgba(31,31,31,0.06)] transition-all hover:-translate-y-px hover:bg-accent"
                >
                  {isLoggedIn ? 'See your globe' : 'See what Vacky does'}
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="travel-badge">
                  <Compass className="size-3.5 text-primary" />
                  destination-ready cards
                </span>
                <span className="travel-badge">
                  <MapPinned className="size-3.5 text-[var(--info)]" />
                  map-first trip detail
                </span>
                <span className="travel-badge">
                  <Globe2 className="size-3.5 text-foreground" />
                  global travel memory
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="travel-panel relative overflow-hidden p-5 md:p-6">
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,90,95,0.16),transparent)]" />
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Featured trip
                      </p>
                      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        Patagonia in soft layers
                      </h2>
                    </div>
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                      Planner
                    </span>
                  </div>

                  <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,#ffb0a0_0%,#fff1f0_35%,#dfeeff_100%)] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">
                          South route
                        </p>
                        <p className="max-w-xs text-3xl font-semibold tracking-[-0.05em] text-foreground">
                          El Calafate, Fitz Roy, and glacier days mapped cleanly.
                        </p>
                      </div>
                      <div className="rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-foreground shadow-[0_8px_18px_rgba(31,31,31,0.08)]">
                        7 days
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="travel-soft-panel p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Discovery
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-foreground">
                        Browse trip covers like keepsakes, not spreadsheets.
                      </p>
                    </div>
                    <div className="travel-utility-panel bg-black p-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                        Utility
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                        Reset map. Add stop. Save itinerary. Move fast.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights" className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 max-w-2xl space-y-3">
          <div className="travel-kicker">Core surfaces</div>
          <h2 className="text-3xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
            A warmer travel product on the pages that matter most.
          </h2>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            Vacky focuses on the trip journey you already use: landing,
            dashboard, trip detail, itinerary planning, and the globe.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featureBlocks.map(({ title, description, icon: Icon }) => (
            <div key={title} className="travel-panel p-6">
              <div className="mb-5 inline-flex rounded-full bg-secondary p-3 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/60">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="travel-panel p-7">
            <p className="travel-kicker">Airbnb direction</p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.05em] text-foreground md:text-4xl">
              Destination-first browsing, calmer spacing, friendlier surfaces.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Discovery pages stay light, rounded, and image-aware so the app
              feels like a consumer travel product instead of a generic tool.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="travel-soft-panel p-6">
              <p className="text-sm font-semibold text-foreground">
                Browse trips with context
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Stronger summaries, more premium cards, and cleaner empty states
                make the core trip surfaces easier to judge at a glance.
              </p>
            </div>
            <div className="travel-soft-panel p-6">
              <p className="text-sm font-semibold text-foreground">
                Plan with tighter chrome
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Itinerary and map-heavy screens borrow just enough Uber-style
                utility contrast to feel faster under pressure.
              </p>
            </div>
            <div className="travel-utility-panel bg-black p-6 text-white md:col-span-2">
              <p className="text-sm font-semibold text-white/70">
                Utility surfaces stay selective
              </p>
              <p className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.04em]">
                Dense screens should scan like tools. The rest of the app should
                still feel like travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="travel-panel relative overflow-hidden p-8 md:p-12">
          <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_center,rgba(255,90,95,0.12),transparent_70%)] blur-2xl" />
          <div className="relative max-w-3xl space-y-5">
            <div className="travel-kicker">Ready to try the new direction?</div>
            <h2 className="text-3xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
              Move from trip ideas to map-backed plans without leaving the same
              travel rhythm.
            </h2>
            <p className="text-base leading-7 text-muted-foreground md:text-lg">
              Vacky keeps discovery, itinerary structure, and global memory in
              one place, now with a stronger consumer-travel visual language.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_16px_32px_rgba(255,90,95,0.28)] transition-all hover:-translate-y-px hover:bg-[var(--primary-strong)]"
              >
                {isLoggedIn ? 'Go to dashboard' : 'Start with GitHub'}
              </AuthButton>
              <Link
                href={isLoggedIn ? '/globe' : '#highlights'}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/80 px-6 text-sm font-semibold text-foreground shadow-[0_10px_22px_rgba(31,31,31,0.06)] transition-all hover:-translate-y-px hover:bg-accent"
              >
                {isLoggedIn ? 'Visit globe' : 'Explore the surfaces'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
