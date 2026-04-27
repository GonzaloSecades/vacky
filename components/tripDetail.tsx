'use client';

import Map from '@/components/map';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTripDateRange } from '@/lib/itinerary-dates';
import type { AppTripWithLocations } from '@/lib/spacetimedb/types';
import { tripLengthInDays } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Pencil,
  Plus,
  Route,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SortableItinerary from './sortable-itinerary';

interface TripDetailProps {
  trip: AppTripWithLocations;
}

function EmptyState({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="travel-empty-state min-h-72">
      <div className="rounded-full bg-secondary p-4 text-primary">
        <Route className="size-5" />
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <Button asChild className="mt-6">
        <Link href={href}>
          <Plus className="size-4" />
          Create itinerary
        </Link>
      </Button>
    </div>
  );
}

export default function TripDetailComponent({ trip }: TripDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const tripLength = tripLengthInDays(trip);
  const { startDateKey, endDateKey } = getTripDateRange(trip);
  const hasLocations = trip.locations.length > 0;
  const itineraryHref = hasLocations
    ? `/trips/${trip.id}/itinerary/edit`
    : `/trips/${trip.id}/itinerary/new`;
  const itineraryActionLabel = hasLocations
    ? 'Edit itinerary'
    : 'Create itinerary';

  return (
    <div className="container mx-auto space-y-8 px-4 py-8 md:space-y-10 md:py-10">
      <section className="travel-panel relative overflow-hidden">
        {trip.coverImageUrl ? (
          <>
            <div className="relative h-[28rem] w-full md:h-[34rem]">
              <Image
                src={trip.coverImageUrl}
                alt={trip.title}
                className="object-cover"
                fill
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.12)_0%,rgba(17,17,17,0.58)_78%)]" />
          </>
        ) : (
          <div className="h-[28rem] w-full bg-[linear-gradient(135deg,#ffd0c6_0%,#fff1f0_40%,#eaf2ff_100%)] md:h-[34rem]" />
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex rounded-full bg-white/84 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-foreground uppercase shadow-[0_8px_18px_rgba(31,31,31,0.08)] backdrop-blur-sm">
              Trip detail
            </span>
            <div>
              <h1
                className={`text-4xl font-bold tracking-[-0.06em] md:text-6xl ${
                  trip.coverImageUrl ? 'text-white' : 'text-foreground'
                }`}
              >
                {trip.title}
              </h1>
              <p
                className={`mt-3 max-w-2xl text-base leading-7 md:text-lg ${
                  trip.coverImageUrl ? 'text-white/82' : 'text-muted-foreground'
                }`}
              >
                {trip.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white/84 px-4 py-2 text-sm font-semibold text-foreground shadow-[0_8px_18px_rgba(31,31,31,0.08)] backdrop-blur-sm">
                {trip.startDate.toLocaleDateString()} -{' '}
                {trip.endDate.toLocaleDateString()}
              </span>
              <span className="rounded-full bg-black/72 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {tripLength}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div className="travel-soft-panel p-5">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dates</p>
              <p className="text-base font-semibold text-foreground">
                {trip.startDate.toLocaleDateString()} -{' '}
                {trip.endDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="travel-soft-panel p-5">
          <div className="flex items-center gap-3">
            <MapPin className="size-5 text-[var(--info)]" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Locations
              </p>
              <p className="text-base font-semibold text-foreground">
                {trip.locations.length === 0
                  ? 'No saved stops yet'
                  : trip.locations.length === 1
                    ? '1 saved stop'
                    : `${trip.locations.length} saved stops`}
              </p>
            </div>
          </div>
        </div>
        <div className="travel-soft-panel flex items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Itinerary
            </p>
            <p className="text-base font-semibold text-foreground">
              {hasLocations ? 'Keep refining it' : 'Start planning'}
            </p>
          </div>
          <Button asChild>
            <Link href={itineraryHref}>
              {hasLocations ? (
                <Pencil className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
              {itineraryActionLabel}
            </Link>
          </Button>
        </div>
      </section>

      <section className="travel-panel p-6 md:p-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-8 flex w-full flex-wrap justify-start">
            <TabsTrigger value="overview" className="sm:flex-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="sm:flex-none">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="sm:flex-none">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <div className="travel-soft-panel p-6">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Trip summary
                  </h2>
                  <div className="mt-5 space-y-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 size-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Dates</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {trip.startDate.toLocaleDateString()} -{' '}
                          {trip.endDate.toLocaleDateString()}
                          <br />({tripLength})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-5 text-[var(--info)]" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Destinations
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {trip.locations.length === 0
                            ? 'No itinerary stops yet.'
                            : trip.locations.length === 1
                              ? '1 stop saved for this trip.'
                              : `${trip.locations.length} stops saved for this trip.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="travel-soft-panel p-6">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Trip notes
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {trip.description}
                  </p>
                </div>
              </div>

              <div className="travel-map-panel min-h-[24rem]">
                {hasLocations ? (
                  <Map itineraries={trip.locations} />
                ) : (
                  <EmptyState
                    title="Add the first stop"
                    description="Create an itinerary to turn this trip into a mapped route with grouped days and saved places."
                    href={itineraryHref}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  Full itinerary
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Review each day, drag stops within the same day, and keep the
                  route readable.
                </p>
              </div>
              {hasLocations ? (
                <Button asChild variant="outline">
                  <Link href={itineraryHref}>
                    <Pencil className="size-4" />
                    Edit itinerary
                  </Link>
                </Button>
              ) : null}
            </div>

            {hasLocations ? (
              <SortableItinerary
                tripId={trip.id}
                locations={trip.locations}
                startDateKey={startDateKey}
                endDateKey={endDateKey}
              />
            ) : (
              <EmptyState
                title="No itinerary yet"
                description="Add each place through the planner and Vacky will group the trip by day automatically."
                href={itineraryHref}
              />
            )}
          </TabsContent>

          <TabsContent value="map">
            <div className="travel-map-panel min-h-[28rem]">
              {hasLocations ? (
                <Map itineraries={trip.locations} />
              ) : (
                <EmptyState
                  title="Map view is waiting on stops"
                  description="Once the itinerary exists, this tab becomes the fastest way to scan the full route."
                  href={itineraryHref}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/trips">
            <ArrowLeft className="size-4" />
            Back to trips
          </Link>
        </Button>
      </div>
    </div>
  );
}
