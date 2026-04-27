'use client';

import reorderItineraryDay from '@/lib/actions/reorder-itinerary';
import type { AppLocation } from '@/lib/spacetimedb/types';
import {
  formatItineraryDateKey,
  generateItineraryDateKeys,
  groupLocationsByScheduledDate,
  sortItineraryLocations,
} from '@/lib/itinerary-dates';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MapPin } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';

interface SortableItineraryProps {
  locations: AppLocation[];
  tripId: string;
  startDateKey: string;
  endDateKey: string;
}

function SortableItem({ item }: { item: AppLocation }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="travel-soft-panel flex items-center justify-between gap-4 p-4 transition-shadow hover:shadow-[0_14px_28px_rgba(31,31,31,0.1)]"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="travel-badge">
            <MapPin className="size-3.5 text-[var(--info)]" />
            Stop {item.order + 1}
          </span>
        </div>
        <h4 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-foreground">
          {item.locationTitle}
        </h4>
        <p className="mt-2 max-w-xl truncate text-sm text-muted-foreground">
          {`Lat ${item.lat.toFixed(4)}, Lng ${item.lng.toFixed(4)}`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground shadow-[0_8px_18px_rgba(31,31,31,0.06)]">
        Drag
        <GripVertical className="size-4" />
      </div>
    </div>
  );
}

function DaySection({
  dateKey,
  dayIndex,
  locations,
  onReorder,
}: {
  dateKey: string;
  dayIndex: number;
  locations: AppLocation[];
  onReorder: (dateKey: string, locations: AppLocation[]) => Promise<void>;
}) {
  const id = useId();

  const handleDrag = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = locations.findIndex(
      (location) => location.id === active.id
    );
    const newIndex = locations.findIndex((location) => location.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    await onReorder(dateKey, arrayMove(locations, oldIndex, newIndex));
  };

  return (
    <section className="travel-panel p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Day {dayIndex + 1}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            {formatItineraryDateKey(dateKey)}
          </h3>
        </div>
        <span className="travel-badge">
          {locations.length} {locations.length === 1 ? 'stop' : 'stops'}
        </span>
      </div>

      {locations.length === 0 ? (
        <div className="travel-empty-state min-h-36">
          <p className="text-sm text-muted-foreground">
            No locations scheduled for this day.
          </p>
        </div>
      ) : (
        <DndContext
          id={`${id}-${dateKey}`}
          collisionDetection={closestCenter}
          onDragEnd={handleDrag}
        >
          <SortableContext
            items={locations.map((location) => location.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {locations.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
  startDateKey,
  endDateKey,
}: SortableItineraryProps) {
  const [localLocations, setLocalLocations] = useState(() =>
    sortItineraryLocations(locations)
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalLocations(sortItineraryLocations(locations));
  }, [locations]);

  const dateKeys = useMemo(
    () => generateItineraryDateKeys(startDateKey, endDateKey),
    [startDateKey, endDateKey]
  );
  const { scheduled, unscheduled } =
    groupLocationsByScheduledDate(localLocations);

  const handleDayReorder = async (
    dateKey: string,
    orderedDayLocations: AppLocation[]
  ) => {
    const previousLocations = localLocations;
    const nextDayLocations = orderedDayLocations.map((location, index) => ({
      ...location,
      order: index,
    }));
    const nextLocations = sortItineraryLocations([
      ...previousLocations.filter(
        (location) => location.scheduledDate !== dateKey
      ),
      ...nextDayLocations,
    ]);

    setError(null);
    setLocalLocations(nextLocations);

    try {
      await reorderItineraryDay(
        tripId,
        dateKey,
        nextDayLocations.map((location) => location.id)
      );
    } catch (reorderError) {
      setLocalLocations(previousLocations);
      setError(
        reorderError instanceof Error
          ? reorderError.message
          : 'Could not reorder itinerary'
      );
    }
  };

  return (
    <div className="space-y-5">
      {error ? (
        <p className="rounded-[1.25rem] border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {dateKeys.map((dateKey, dayIndex) => (
        <DaySection
          key={dateKey}
          dateKey={dateKey}
          dayIndex={dayIndex}
          locations={scheduled.get(dateKey) ?? []}
          onReorder={handleDayReorder}
        />
      ))}

      {unscheduled.length > 0 ? (
        <section className="travel-panel border-dashed p-5 md:p-6">
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Unscheduled locations
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These locations still need a trip day.
          </p>
          <div className="mt-5 space-y-4">
            {unscheduled.map((location) => (
              <div
                key={location.id}
                className="travel-soft-panel p-4"
              >
                <h4 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {location.locationTitle}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {`Lat ${location.lat.toFixed(4)}, Lng ${location.lng.toFixed(4)}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
