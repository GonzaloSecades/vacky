import type { AppTrip } from '@/lib/spacetimedb/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tripLengthInDays(
  trip: Pick<AppTrip, 'startDate' | 'endDate'>
) {
  const days = Math.ceil(
    (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 1) {
    return '1 day';
  }
  return `${days} days`;
}
