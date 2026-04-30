import { getAllTrips } from '@/lib/actions/get-all-trips';
import { getSession } from '@/lib/auth/session';
import { DeletedTripToast } from './deleted-trip-toast';
import { TripsContent } from './trips-content';

export default async function TripsPage(props: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const searchParams = await props.searchParams;
  const session = await getSession();

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="travel-empty-state">
          <h1 className="text-foreground text-2xl font-semibold tracking-[-0.03em]">
            Sign in to see your trips
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
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
  const pastTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) < today
  );

  return (
    <>
      <DeletedTripToast show={searchParams.deleted === 'trip'} />
      <TripsContent
        userName={session.user?.name || session.user?.email || ''}
        sortedTrips={sortedTrips}
        upcomingTrips={upcomingTrips}
        pastTrips={pastTrips}
        totalTrips={trips.length}
      />
    </>
  );
}
