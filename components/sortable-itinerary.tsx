import { Location } from '@/app/generated/prisma';
import reorderItinerary from '@/lib/actions/reorder-itinerary';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useId, useState } from 'react';

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
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
      className="flex items-center justify-between rounded-md border p-4 transition-shadow hover:shadow"
    >
      <div>
        <h4 className="font-medium text-gray-800">{item.locationTitle}</h4>
        <p className="max-w-xs truncate text-sm text-gray-500">{`Latitude :${item.lat}, Longitude: ${item.lng}`}</p>
      </div>
      <div className="text-sm text-gray-600">Day {item.order + 1}</div>
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const id = useId();

  const [localLocation, setLocalLocation] = useState(locations);

  const handleDrag = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((l) => l.id === active.id);
      const newIndex = localLocation.findIndex((l) => l.id === over?.id);
      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((location, index) => ({
        ...location,
        order: index,
      }));
      setLocalLocation(newLocationsOrder);
      await reorderItinerary(
        tripId,
        newLocationsOrder.map((l) => l.id)
      );
    }
  };
  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDrag}
    >
      <SortableContext
        items={localLocation.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {localLocation.map((item, key) => (
            <SortableItem key={key} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
