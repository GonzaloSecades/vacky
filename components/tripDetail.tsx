'use client';

import Map from '@/components/map';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTripDateRange } from '@/lib/itinerary-dates';
import type { AppTripWithLocations } from '@/lib/spacetimedb/types';
import { tripLengthInDays } from '@/lib/utils';
import { ArrowLeft, Calendar, MapPin, Pencil, Plus, Route } from 'lucide-react';
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
      <div className="bg-accent text-primary rounded-full p-4">
        <Route className="size-5" />
      </div>
      <h3 className="text-foreground mt-4 text-2xl font-semibold tracking-[-0.03em]">
        {title}
      </h3>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
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
            <div className="relative h-112 w-full md:h-136">
              <Image
                src={trip.coverImageUrl}
                alt={trip.title}
                className="object-cover"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,31,49,0.12)_0%,rgba(37,31,49,0.62)_80%)]" />
          </>
        ) : (
          <div className="h-112 w-full bg-[linear-gradient(135deg,#f7f2fe_0%,#eee8f7_45%,#e7eefb_100%)] md:h-136" />
        )}

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
          <div className="max-w-3xl space-y-5">
            <span className="text-foreground inline-flex rounded-full bg-white/88 px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase shadow-[0_8px_18px_rgba(73,58,104,0.08)] backdrop-blur-sm">
              Trip detail
            </span>
            <div>
              <h1
                className={`font-serif text-5xl tracking-[-0.06em] md:text-7xl ${
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
              <span className="text-foreground rounded-full bg-white/88 px-4 py-2 text-sm font-semibold shadow-[0_8px_18px_rgba(73,58,104,0.08)] backdrop-blur-sm">
                {trip.startDate.toLocaleDateString()} -{' '}
                {trip.endDate.toLocaleDateString()}
              </span>
              <span className="rounded-full bg-[rgba(37,31,49,0.76)] px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {tripLength}
              </span>
              <span className="travel-stamp">
                {trip.endDate < new Date()
                  ? 'Completed'
                  : trip.startDate > new Date()
                    ? 'Upcoming'
                    : 'In progress'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div className="travel-soft-panel p-5">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary size-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Dates</p>
              <p className="text-foreground text-base font-semibold">
                {trip.startDate.toLocaleDateString()} -{' '}
                {trip.endDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="travel-soft-panel p-5">
          <div className="flex items-center gap-3">
            <MapPin className="text-info size-5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Locations
              </p>
              <p className="text-foreground text-base font-semibold">
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
            <p className="text-muted-foreground text-sm font-medium">
              Itinerary
            </p>
            <p className="text-foreground text-base font-semibold">
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
                  <h2 className="travel-section-title text-foreground text-[2.15rem]">
                    Trip summary
                  </h2>
                  <div className="mt-5 space-y-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-0.5 size-5" />
                      <div>
                        <p className="text-foreground font-semibold">Dates</p>
                        <p className="text-muted-foreground mt-1 text-sm leading-6">
                          {trip.startDate.toLocaleDateString()} -{' '}
                          {trip.endDate.toLocaleDateString()}
                          <br />({tripLength})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-info mt-0.5 size-5" />
                      <div>
                        <p className="text-foreground font-semibold">
                          Destinations
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm leading-6">
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
                  <h2 className="travel-section-title text-foreground text-[2.15rem]">
                    Trip notes
                  </h2>
                  <p className="text-muted-foreground mt-4 text-base leading-7">
                    {trip.description}
                  </p>
                </div>
              </div>

              <div className="travel-map-panel h-96">
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
                <h2 className="travel-section-title text-foreground">
                  Full itinerary
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
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
            <div className="travel-map-panel h-96">
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
