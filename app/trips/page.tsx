import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { getAllTrips } from '@/lib/actions/get-all-trips';
import { CalendarDays, Clock3, Plus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function formatTripStatus(startDate: Date, today: Date) {
  return startDate >= today ? 'Upcoming' : 'Past';
}

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="travel-empty-state">
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Sign in to see your trips
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Your dashboard stays private and shows only the trips attached to
            your account.
          </p>
        </div>
      </div>
    );
  }

  const trips = await getAllTrips();
  const sortedTrips = [...trips].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );
  const pastTrips = sortedTrips.filter((trip) => new Date(trip.startDate) < today);

  return (
    <div className="container mx-auto space-y-10 px-4 py-10 md:py-12">
      <section className="travel-panel relative overflow-hidden p-7 md:p-9">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,90,95,0.16),transparent_72%)] blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="travel-kicker">
              <Sparkles className="size-3.5" />
              Dashboard
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
                Welcome back, {session.user?.name || session.user?.email}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Keep upcoming plans close, revisit past journeys, and open any
                trip from a cleaner, more image-forward overview.
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
            <p className="text-sm font-medium text-muted-foreground">
              Total trips
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {trips.length}
            </p>
          </div>
          <div className="travel-soft-panel p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Upcoming
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {upcomingTrips.length}
            </p>
          </div>
          <div className="travel-soft-panel p-5">
            <p className="text-sm font-medium text-muted-foreground">Past</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {pastTrips.length}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="travel-kicker">Trips</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-foreground">
              Your recent journeys
            </h2>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="travel-empty-state">
            <div className="rounded-full bg-secondary p-4 text-primary">
              <CalendarDays className="size-6" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
              No trips yet
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
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
              const tripStatus = formatTripStatus(new Date(trip.startDate), today);

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
                        />
                      ) : (
                        <div className="flex h-full items-end bg-[linear-gradient(135deg,#ffe1da_0%,#fff1f0_48%,#eef4ff_100%)] p-6">
                          <div className="max-w-[14rem]">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
                              Vacky trip
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                              {trip.title}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="rounded-full bg-white/86 px-3 py-1 text-xs font-semibold text-foreground shadow-[0_8px_18px_rgba(31,31,31,0.08)] backdrop-blur-sm">
                          {tripStatus}
                        </span>
                        <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(17,17,17,0.16)]">
                          Open trip
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 p-6">
                      <div>
                        <h3 className="line-clamp-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                          {trip.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {trip.description
                            ? trip.description.charAt(0).toUpperCase() +
                              trip.description.slice(1)
                            : 'A trip ready for dates, places, and map-backed memories.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="travel-badge">
                          <CalendarDays className="size-3.5 text-primary" />
                          {new Date(trip.startDate).toLocaleDateString()} -{' '}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                        <span className="travel-badge">
                          <Clock3 className="size-3.5 text-foreground" />
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
