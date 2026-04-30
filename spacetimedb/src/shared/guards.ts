type TripLookupDb = {
  trip: {
    id: {
      find: (tripId: bigint) => { userId: bigint } | null | undefined;
    };
  };
};

export const requireOwnedTrip = (
  db: TripLookupDb,
  userId: bigint,
  tripId: bigint
) => {
  const trip = db.trip.id.find(tripId);

  if (!trip || trip.userId !== userId) {
    throw new Error('Trip not found');
  }

  return trip;
};
