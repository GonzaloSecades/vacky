const ITINERARY_DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export interface TripDateRangeSource {
  startDate: Date | string;
  endDate: Date | string;
}

export interface ScheduledLocationLike {
  locationTitle: string;
  order: number;
  scheduledDate: string | null;
}

function padDatePart(value: number) {
  return value.toString().padStart(2, '0');
}

function parseDateKeyParts(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return { year, month, day };
}

export function isItineraryDateKey(value: unknown): value is string {
  if (typeof value !== 'string' || !ITINERARY_DATE_KEY_PATTERN.test(value)) {
    return false;
  }

  const { year, month, day } = parseDateKeyParts(value);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function dateToItineraryDateKey(value: Date | string) {
  if (typeof value === 'string' && isItineraryDateKey(value)) {
    return value;
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return [
    date.getUTCFullYear(),
    padDatePart(date.getUTCMonth() + 1),
    padDatePart(date.getUTCDate()),
  ].join('-');
}

export function compareItineraryDateKeys(left: string, right: string) {
  return left.localeCompare(right);
}

export function isDateKeyWithinRange(
  dateKey: string,
  startDateKey: string,
  endDateKey: string
) {
  return (
    isItineraryDateKey(dateKey) &&
    compareItineraryDateKeys(dateKey, startDateKey) >= 0 &&
    compareItineraryDateKeys(dateKey, endDateKey) <= 0
  );
}

export function getTripDateRange(trip: TripDateRangeSource) {
  return {
    startDateKey: dateToItineraryDateKey(trip.startDate),
    endDateKey: dateToItineraryDateKey(trip.endDate),
  };
}

export function addDaysToItineraryDateKey(dateKey: string, days: number) {
  const { year, month, day } = parseDateKeyParts(dateKey);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  return [
    date.getUTCFullYear(),
    padDatePart(date.getUTCMonth() + 1),
    padDatePart(date.getUTCDate()),
  ].join('-');
}

export function generateItineraryDateKeys(
  startDateKey: string,
  endDateKey: string
) {
  if (
    !isItineraryDateKey(startDateKey) ||
    !isItineraryDateKey(endDateKey) ||
    compareItineraryDateKeys(startDateKey, endDateKey) > 0
  ) {
    return [];
  }

  const dateKeys: string[] = [];
  for (
    let dateKey = startDateKey;
    compareItineraryDateKeys(dateKey, endDateKey) <= 0;
    dateKey = addDaysToItineraryDateKey(dateKey, 1)
  ) {
    dateKeys.push(dateKey);
  }

  return dateKeys;
}

export function dateKeyToLocalDate(dateKey: string) {
  const { year, month, day } = parseDateKeyParts(dateKey);
  return new Date(year, month - 1, day);
}

export function formatItineraryDateKey(dateKey: string) {
  return dateKeyToLocalDate(dateKey).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function groupLocationsByScheduledDate<T extends ScheduledLocationLike>(
  locations: T[]
) {
  const scheduled = new Map<string, T[]>();
  const unscheduled: T[] = [];

  for (const location of locations) {
    if (!location.scheduledDate) {
      unscheduled.push(location);
      continue;
    }

    const dayLocations = scheduled.get(location.scheduledDate) ?? [];
    dayLocations.push(location);
    scheduled.set(location.scheduledDate, dayLocations);
  }

  for (const dayLocations of scheduled.values()) {
    dayLocations.sort(sortLocationsWithinDay);
  }
  unscheduled.sort(sortLocationsWithinDay);

  return { scheduled, unscheduled };
}

export function sortLocationsWithinDay<T extends ScheduledLocationLike>(
  left: T,
  right: T
) {
  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.locationTitle.localeCompare(right.locationTitle);
}

export function sortItineraryLocations<T extends ScheduledLocationLike>(
  locations: T[]
) {
  return [...locations].sort((left, right) => {
    if (left.scheduledDate && right.scheduledDate) {
      const dateComparison = compareItineraryDateKeys(
        left.scheduledDate,
        right.scheduledDate
      );
      if (dateComparison !== 0) {
        return dateComparison;
      }
    } else if (left.scheduledDate) {
      return -1;
    } else if (right.scheduledDate) {
      return 1;
    }

    return sortLocationsWithinDay(left, right);
  });
}
