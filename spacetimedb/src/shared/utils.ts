import { Timestamp } from 'spacetimedb';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isExpired = (value: Timestamp, now: Timestamp) =>
  value.microsSinceUnixEpoch <= now.microsSinceUnixEpoch;

export const compareMaybeStrings = (left?: string, right?: string) => {
  if (left && right) return left.localeCompare(right);
  if (left) return -1;
  if (right) return 1;
  return 0;
};

export const sortTrips = <T extends { startDate: Timestamp }>(trips: T[]) =>
  trips.sort((left, right) => {
    const diff =
      right.startDate.microsSinceUnixEpoch -
      left.startDate.microsSinceUnixEpoch;
    if (diff > 0n) return 1;
    if (diff < 0n) return -1;
    return 0;
  });

export const sortLocations = <
  T extends { scheduledDate?: string; order: number; locationTitle: string },
>(
  locations: T[]
) =>
  locations.sort((left, right) => {
    const dateComparison = compareMaybeStrings(
      left.scheduledDate,
      right.scheduledDate
    );
    if (dateComparison !== 0) return dateComparison;
    if (left.order !== right.order) return left.order - right.order;
    return left.locationTitle.localeCompare(right.locationTitle);
  });
