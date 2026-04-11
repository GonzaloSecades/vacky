'use client';

import { Location, Trip } from '@/app/generated/prisma';
import Map from '@/components/map';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTripDateRange } from '@/lib/itinerary-dates';
import { tripLengthInDays } from '@/lib/utils';

import { Calendar, MapPin, Pencil, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SortableItinerary from './sortable-itinerary';

export type TripWithLocation = Trip & {
  locations: Location[];
};
interface TripDetailProps {
  trip: TripWithLocation;
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
    <div className="container mx-auto space-y-8 px-4 py-8">
      {trip.coverImageUrl && (
        <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg md:h-96">
          <Image
            src={trip.coverImageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="bg-card text-card-foreground flex flex-col items-start justify-between rounded-lg border border-border p-6 shadow-sm md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground">
            {trip.title}
          </h1>
          <div className="text-muted-foreground mt-2 flex items-center">
            <Calendar className="mr-2 size-5" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{' '}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link href={itineraryHref}>
              {hasLocations ? (
                <Pencil className="mr-2 size-4" />
              ) : (
                <Plus className="mr-2 size-4" />
              )}
              {itineraryActionLabel}
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-lg border border-border p-6 shadow-sm">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            {/* <TabsTrigger value="photos" className="text-lg">
              Photos
            </TabsTrigger> */}
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>
          {/* Tab content would go here, conditionally rendered based on activeTab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  Trip Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="text-muted-foreground mr-3 size-6" />
                    <div>
                      <p className="font-medium text-foreground">Dates</p>
                      <p className="text-muted-foreground text-sm">
                        {trip.startDate.toLocaleDateString()} -{' '}
                        {trip.endDate.toLocaleDateString()}
                        <br />({tripLength})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-muted-foreground mr-3 size-6" />
                    <div>
                      <p className="font-medium text-foreground">
                        Destinations
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {trip.locations.length === 0
                          ? 'No locations'
                          : trip.locations.length === 1
                            ? '1 location'
                            : `${trip.locations.length} locations`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 h-72 overflow-hidden rounded-lg border border-border shadow-sm">
                {trip.locations.length === 0 ? (
                  <div className="p-4 text-center text-foreground">
                    <p>Create an itinerary to see locations on the map</p>
                    <Button asChild className="mt-2">
                      <Link href={itineraryHref}>
                        <Plus className="mr-2 size-4" />
                        Create itinerary
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Map itineraries={trip.locations} />
                )}
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {trip.description}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="itinerary" className="space-y-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Full Itinerary
              </h2>
              {hasLocations && (
                <Button asChild variant="outline">
                  <Link href={itineraryHref}>
                    <Pencil className="mr-2 size-4" />
                    Edit itinerary
                  </Link>
                </Button>
              )}
            </div>
            {trip.locations.length === 0 ? (
              <div className="p-4 text-center text-foreground">
                <p>Create an itinerary to schedule this trip.</p>
                <Button asChild className="mt-2">
                  <Link href={itineraryHref}>
                    <Plus className="mr-2 size-4" />
                    Create itinerary
                  </Link>
                </Button>
              </div>
            ) : (
              <SortableItinerary
                tripId={trip.id}
                locations={trip.locations}
                startDateKey={startDateKey}
                endDateKey={endDateKey}
              />
            )}
          </TabsContent>
          <TabsContent value="map" className="space-y-6">
            <div className="bg-muted/30 h-72 overflow-hidden rounded-lg border border-border shadow-sm">
              {trip.locations.length === 0 ? (
                <div className="p-4 text-center text-foreground">
                  <p>Create an itinerary to see locations on the map</p>
                  <Button asChild className="mt-2">
                    <Link href={itineraryHref}>
                      <Plus className="mr-2 size-4" />
                      Create itinerary
                    </Link>
                  </Button>
                </div>
              ) : (
                <Map itineraries={trip.locations} />
              )}
            </div>
          </TabsContent>
          {/* <TabsContent value="photos" className="space-y-6"></TabsContent> */}
        </Tabs>
      </div>
      <div className="text-center">
        <Button asChild className="mt-2">
          <Link href="/trips">Back to Trips</Link>
        </Button>
      </div>
    </div>
  );
}
