'use client';
import { Location } from '@/app/generated/prisma';
import reorderItineraryDay from '@/lib/actions/reorder-itinerary';
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
import { GripVertical } from 'lucide-react';
import { useEffect, useId, useMemo, useState } from 'react';

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
  startDateKey: string;
  endDateKey: string;
}

function SortableItem({ item }: { item: Location }) {
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
      className="bg-card text-card-foreground border-border flex items-center justify-between rounded-md border p-4 transition-shadow hover:shadow-sm"
    >
      <div className="min-w-0">
        <h4 className="text-foreground font-medium">{item.locationTitle}</h4>
        <p className="text-muted-foreground max-w-xs truncate text-sm">{`Latitude :${item.lat}, Longitude: ${item.lng}`}</p>
      </div>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span>Stop {item.order + 1}</span>
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
  locations: Location[];
  onReorder: (dateKey: string, locations: Location[]) => Promise<void>;
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
    <section className="border-border rounded-lg border p-4">
      <div className="mb-4">
        <h3 className="text-foreground font-semibold">
          Day {dayIndex + 1}: {formatItineraryDateKey(dateKey)}
        </h3>
      </div>
      {locations.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No locations scheduled for this day.
        </p>
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
    orderedDayLocations: Location[]
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
    <div className="space-y-4">
      {error && (
        <p className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm">
          {error}
        </p>
      )}
      {dateKeys.map((dateKey, dayIndex) => (
        <DaySection
          key={dateKey}
          dateKey={dateKey}
          dayIndex={dayIndex}
          locations={scheduled.get(dateKey) ?? []}
          onReorder={handleDayReorder}
        />
      ))}
      {unscheduled.length > 0 && (
        <section className="border-border rounded-lg border border-dashed p-4">
          <h3 className="text-foreground mb-1 font-semibold">
            Unscheduled locations
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            These locations do not have a scheduled date yet.
          </p>
          <div className="space-y-4">
            {unscheduled.map((location) => (
              <div
                key={location.id}
                className="bg-card text-card-foreground border-border rounded-md border p-4"
              >
                <h4 className="text-foreground font-medium">
                  {location.locationTitle}
                </h4>
                <p className="text-muted-foreground max-w-xs truncate text-sm">{`Latitude :${location.lat}, Longitude: ${location.lng}`}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
