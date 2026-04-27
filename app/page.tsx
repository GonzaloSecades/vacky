import AuthButton from '@/components/auth-button';
import { getSession } from '@/lib/auth/session';
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
    title: 'Postcard-like trip cards',
    description:
      'Memory-led browsing now leans on softer paper surfaces, destination-first photography, and quieter metadata.',
    icon: Compass,
  },
  {
    title: 'Clearer planning rhythm',
    description:
      'Itinerary views keep their speed, but the UI now separates editorial warmth from operational contrast more clearly.',
    icon: CalendarRange,
  },
  {
    title: 'Maps that stay legible',
    description:
      'Planner and map-heavy surfaces preserve their dense utility contrast without dragging the whole product into dashboard mode.',
    icon: MapPinned,
  },
];

export default async function LandingPage() {
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  return (
    <main className="overflow-hidden">
      <section className="border-border/70 relative border-b">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(123,94,167,0.18),transparent_48%)]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(86,136,212,0.12),transparent_70%)] blur-3xl" />
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative z-10 space-y-7">
              <div className="travel-kicker">
                <Sparkles className="size-3.5" />
                Twilight Postcards
              </div>
              <div className="space-y-5">
                <h1 className="travel-display-title text-foreground max-w-4xl">
                  Trips that feel collected, planned, and ready to become
                  stories.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-lg leading-8 md:text-xl">
                  Vacky keeps reflective travel memories and forward-looking
                  planning in one coherent workspace, with photography first and
                  ornament kept in its place.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="inline-flex h-12 px-6"
                >
                  {isLoggedIn ? 'Open your trips' : 'Create your account'}
                </AuthButton>
                <Link
                  href={isLoggedIn ? '/globe' : '#highlights'}
                  className="border-border text-foreground hover:bg-accent inline-flex h-12 items-center justify-center rounded-full border bg-white/84 px-6 text-sm font-semibold shadow-[0_10px_24px_rgba(73,58,104,0.06)] transition-all hover:-translate-y-px"
                >
                  {isLoggedIn ? 'See your globe' : 'See what Vacky does'}
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="travel-badge">
                  <Compass className="text-memory size-3.5" />
                  memory-led cards
                </span>
                <span className="travel-badge">
                  <MapPinned className="text-info size-3.5" />
                  planner clarity
                </span>
                <span className="travel-badge">
                  <Globe2 className="text-primary size-3.5" />
                  global travel memory
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="travel-panel relative overflow-hidden p-5 md:p-6">
                <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(123,94,167,0.12),transparent)]" />
                <div className="absolute right-6 bottom-6 hidden md:block">
                  <span className="travel-stamp">Patagonia</span>
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm font-semibold">
                        Featured trip
                      </p>
                      <h2 className="travel-section-title text-foreground mt-2 text-[2.15rem] md:text-[2.4rem]">
                        Patagonia in twilight layers
                      </h2>
                    </div>
                    <span className="rounded-full bg-[rgba(37,31,49,0.92)] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white uppercase">
                      Planner
                    </span>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/70 bg-[linear-gradient(135deg,#f7f2fe_0%,#eee8f7_48%,#e8f0ff_100%)] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-foreground/55 text-sm font-semibold tracking-[0.2em] uppercase">
                          Southern route
                        </p>
                        <p className="text-foreground max-w-xs font-serif text-3xl tracking-[-0.05em]">
                          El Calafate, Fitz Roy, and glacier days mapped with a
                          cleaner travel rhythm.
                        </p>
                      </div>
                      <div className="travel-badge text-foreground bg-white/92">
                        7 days
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="travel-soft-panel p-4">
                      <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                        Memory
                      </p>
                      <p className="text-foreground mt-3 text-lg font-semibold tracking-[-0.03em]">
                        Browse trip covers like keepsakes instead of cards from
                        a generic dashboard.
                      </p>
                    </div>
                    <div className="travel-utility-panel p-4">
                      <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
                        Utility
                      </p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                        Reset map. Add stop. Save itinerary. Stay fast where the
                        planning gets dense.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="highlights"
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="mb-10 max-w-2xl space-y-3">
          <div className="travel-kicker">Core surfaces</div>
          <h2 className="travel-section-title text-foreground">
            One travel product, with room for memory and planning to behave
            differently.
          </h2>
          <p className="text-muted-foreground text-base leading-7 md:text-lg">
            Vacky now uses the same system across landing, dashboard, trip
            detail, itinerary planning, and the globe without flattening every
            page into the same mood.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featureBlocks.map(({ title, description, icon: Icon }) => (
            <div key={title} className="travel-panel p-6">
              <div className="bg-accent text-primary mb-5 inline-flex rounded-full p-3">
                <Icon className="size-5" />
              </div>
              <h3 className="text-foreground text-2xl font-semibold tracking-[-0.04em]">
                {title}
              </h3>
              <p className="text-muted-foreground mt-3 text-base leading-7">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-border/70 border-y bg-white/52">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="travel-panel p-7">
            <p className="travel-kicker">System direction</p>
            <h2 className="travel-section-title text-foreground mt-5">
              Plum brand moments, paper-led surfaces, and denser contrast only
              where utility needs it.
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-7">
              Memory-led views can breathe and feel a little warmer. Trip
              overviews bridge the emotional and the operational. Planner and
              map-heavy screens stay tighter, faster, and darker where that
              helps legibility.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="travel-soft-panel p-6">
              <p className="text-foreground text-sm font-semibold">
                Decorative cues stay restrained
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Subtle stamps, route hints, and warm footer atmosphere can
                reinforce travel memory without fighting the photography.
              </p>
            </div>
            <div className="travel-soft-panel p-6">
              <p className="text-foreground text-sm font-semibold">
                Planning gets its own contrast
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Map controls and itinerary tools get the strongest contrast in
                the system so dense tasks remain quick to scan.
              </p>
            </div>
            <div className="travel-utility-panel p-6 md:col-span-2">
              <p className="text-sm font-semibold text-white/70">
                The operational rule
              </p>
              <p className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.04em]">
                Dense screens should behave like tools. The rest of the app
                should still feel like travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="travel-panel relative overflow-hidden p-8 md:p-12">
          <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_center,rgba(227,196,109,0.14),transparent_72%)] blur-2xl" />
          <div className="relative max-w-3xl space-y-5">
            <div className="travel-kicker">Ready to travel with it?</div>
            <h2 className="travel-section-title text-foreground md:text-5xl">
              Move from saved places to map-backed plans without leaving the
              same editorial travel rhythm.
            </h2>
            <p className="text-muted-foreground text-base leading-7 md:text-lg">
              Vacky keeps discovery, itinerary structure, and global memory in
              one place, now with the same light-mode system that defines the
              rest of the app.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="inline-flex h-12 px-6"
              >
                {isLoggedIn ? 'Go to dashboard' : 'Create your account'}
              </AuthButton>
              <Link
                href={isLoggedIn ? '/globe' : '#highlights'}
                className="border-border text-foreground hover:bg-accent inline-flex h-12 items-center justify-center rounded-full border bg-white/84 px-6 text-sm font-semibold shadow-[0_10px_24px_rgba(73,58,104,0.06)] transition-all hover:-translate-y-px"
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
