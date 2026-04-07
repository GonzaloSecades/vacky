import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllTrips } from '@/lib/actions/get-all-trips';
import Image from 'next/image';
import Link from 'next/link';

export default async function TripsPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-700">
        Please sign in to view your trips.
      </div>
    );
  }

  const trips = await getAllTrips();

  const sortedTrips = [...trips].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the day for accurate comparison
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );
  const pastTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) < today
  );

  return (
    <>
      <div className="container mx-auto space-y-6 px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {trips && trips.length > 0 ? (
            <Button asChild>
              <Link href="/trips/new">Create Trip</Link>
            </Button>
          ) : null}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              Welcome back {session.user?.name || session.user?.email}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {`You have ${trips.length} trips planned. ${
                upcomingTrips.length > 0
                  ? `${upcomingTrips.length} upcoming`
                  : 'No upcoming'
              } trip${upcomingTrips.length !== 1 ? 's' : ''} and ${
                pastTrips.length > 0 ? `${pastTrips.length} past` : 'no past'
              } trip${pastTrips.length !== 1 ? 's' : ''}.`}
            </p>
          </CardContent>
        </Card>
        <div>
          <h2 className="mb-4 px-4 py-4 text-xl font-semibold">
            Your recent trips
          </h2>
          {trips.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <h3 className="mb-2 text-xl font-medium">
                  You have no trips yet
                </h3>
                <p className="mb-4 max-w-md text-center text-sm text-gray-600">
                  Start planning your next adventure by creating a new trip.
                </p>
                <Button asChild>
                  <Link href="/trips/new">Create</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedTrips.slice(0, 6).map((trip, key) => (
                <Link key={key} href={`/trips/${trip.id}`}>
                  <Card className="h-full cursor-pointer">
                    <CardHeader className="h-full transition-shadow hover:shadow-md">
                      <CardTitle className="line-clamp-2">
                        {trip.title}
                      </CardTitle>
                      {trip.coverImageUrl ? (
                        <Image
                          src={trip.coverImageUrl}
                          alt={trip.title}
                          className="h-48 w-full object-cover py-1"
                          width={200}
                          height={200}
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-gray-200 text-gray-500">
                          No Image
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <h3 className="mb-2 line-clamp-1 text-sm font-bold">
                        {trip.description?.charAt(0).toUpperCase() +
                          trip.description?.slice(1)}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {new Date(trip.startDate).toLocaleDateString()} -{' '}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
