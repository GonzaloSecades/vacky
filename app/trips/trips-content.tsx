import { Button } from '@/components/ui/button';
import type { AppTrip } from '@/lib/spacetimedb/types';
import { CalendarDays, Clock3, Plus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function formatTripStatus(startDate: Date, today: Date) {
  return startDate >= today ? 'Upcoming' : 'Past';
}

interface TripsContentProps {
  userName: string;
  sortedTrips: AppTrip[];
  upcomingTrips: AppTrip[];
  pastTrips: AppTrip[];
  totalTrips: number;
}

export function TripsContent({
  userName,
  sortedTrips,
  upcomingTrips,
  pastTrips,
  totalTrips,
}: TripsContentProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="container mx-auto space-y-10 px-4 py-10 md:py-12">
      <section className="travel-panel relative overflow-hidden p-7 md:p-9">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(123,94,167,0.16),transparent_72%)] blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="travel-kicker">
              <Sparkles className="size-3.5" />
              Dashboard
            </div>
            <div className="space-y-3">
              <h1 className="travel-section-title text-foreground md:text-5xl">
                Welcome back, {userName}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-7 md:text-lg">
                Keep upcoming plans close, revisit past journeys, and open each
                trip from a warmer, more editorial dashboard.
              </p>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/trips/new">
              <Plus className="size-4" />
              Create trip
            </Link>
          </Button>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          <div className="travel-soft-panel p-5">
            <p className="text-muted-foreground text-sm font-medium">
              Total trips
            </p>
            <p className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
              {totalTrips}
            </p>
          </div>
          <div className="travel-soft-panel p-5">
            <p className="text-muted-foreground text-sm font-medium">
              Upcoming
            </p>
            <p className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
              {upcomingTrips.length}
            </p>
          </div>
          <div className="travel-soft-panel p-5">
            <p className="text-muted-foreground text-sm font-medium">Past</p>
            <p className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
              {pastTrips.length}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="travel-kicker">Trips</p>
            <h2 className="travel-section-title text-foreground mt-3 md:text-[2.8rem]">
              Your recent journeys
            </h2>
          </div>
        </div>

        {sortedTrips.length === 0 ? (
          <div className="travel-empty-state">
            <div className="bg-accent text-primary rounded-full p-4">
              <CalendarDays className="size-6" />
            </div>
            <h3 className="text-foreground mt-4 text-2xl font-semibold tracking-[-0.03em]">
              No trips yet
            </h3>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
              Start with one destination, one set of dates, and a cover image.
              The dashboard will take it from there.
            </p>
            <Button asChild className="mt-6">
              <Link href="/trips/new">
                <Plus className="size-4" />
                Create your first trip
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sortedTrips.slice(0, 6).map((trip) => {
              const tripStatus = formatTripStatus(
                new Date(trip.startDate),
                today
              );

              return (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group block"
                >
                  <article className="travel-panel h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:[box-shadow:var(--shadow-travel-hover)]">
                    <div className="relative h-60 overflow-hidden">
                      {trip.coverImageUrl ? (
                        <Image
                          src={trip.coverImageUrl}
                          alt={trip.title}
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          fill
                          sizes="(min-width: 1280px) 24rem, (min-width: 768px) calc(50vw - 2rem), 100vw"
                        />
                      ) : (
                        <div className="flex h-full items-end bg-[linear-gradient(135deg,#f7f2fe_0%,#eee8f7_48%,#eef4ff_100%)] p-6">
                          <div className="max-w-56">
                            <p className="text-foreground/55 text-xs font-semibold tracking-[0.18em] uppercase">
                              Vacky trip
                            </p>
                            <p className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
                              {trip.title}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="text-foreground rounded-full bg-white/88 px-3 py-1 text-xs font-semibold shadow-[0_8px_18px_rgba(73,58,104,0.08)] backdrop-blur-sm">
                          {tripStatus}
                        </span>
                        <span className="rounded-full bg-[rgba(37,31,49,0.92)] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-[0_8px_18px_rgba(17,17,17,0.16)]">
                          Open trip
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 p-6">
                      <div>
                        <h3 className="text-foreground line-clamp-2 text-2xl font-semibold tracking-[-0.04em]">
                          {trip.title}
                        </h3>
                        <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6">
                          {trip.description
                            ? trip.description.charAt(0).toUpperCase() +
                              trip.description.slice(1)
                            : 'A trip ready for dates, places, and map-backed memories.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="travel-badge">
                          <CalendarDays className="text-primary size-3.5" />
                          {new Date(trip.startDate).toLocaleDateString()} -{' '}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                        <span className="travel-badge">
                          <Clock3 className="text-memory size-3.5" />
                          {tripStatus === 'Upcoming' ? 'plan ahead' : 'revisit'}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
