'use client';

import ItineraryPlannerMap, {
  ItineraryPlannerMarker,
} from '@/components/itinerary-planner-map';
import { Button } from '@/components/ui/button';
import {
  createItinerary,
  ItineraryActionState,
  saveItinerary,
} from '@/lib/actions/itinerary';
import {
  getGoogleMapsBrowserApiKey,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
} from '@/lib/google-maps';
import {
  formatItineraryDateKey,
  isDateKeyWithinRange,
} from '@/lib/itinerary-dates';
import { cn } from '@/lib/utils';
import { useJsApiLoader } from '@react-google-maps/api';
import { Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface ItineraryPlannerTrip {
  id: string;
  title: string;
  startDateKey: string;
  endDateKey: string;
}

export interface ItineraryPlannerInitialLocation {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  scheduledDate: string | null;
  order: number;
}

interface ItineraryPlannerProps {
  mode: 'new' | 'edit';
  trip: ItineraryPlannerTrip;
  initialLocations: ItineraryPlannerInitialLocation[];
}

interface PlannerRow {
  clientId: string;
  id?: string;
  inputValue: string;
  locationTitle: string;
  lat: number | null;
  lng: number | null;
  scheduledDate: string;
  placeId?: string;
  originalLocationTitle?: string;
  originalLat?: number;
  originalLng?: number;
}

interface PlaceSuggestion {
  placeId: string;
  description: string;
}

const initialActionState: ItineraryActionState = {};
const AUTOCOMPLETE_DELAY_MS = 300;
const MIN_AUTOCOMPLETE_LENGTH = 3;
const MAX_SUGGESTIONS = 5;

function createInitialRows(
  initialLocations: ItineraryPlannerInitialLocation[]
): PlannerRow[] {
  if (initialLocations.length === 0) {
    return [
      {
        clientId: 'new-row-1',
        inputValue: '',
        locationTitle: '',
        lat: null,
        lng: null,
        scheduledDate: '',
      },
    ];
  }

  return initialLocations.map((location) => ({
    clientId: location.id,
    id: location.id,
    inputValue: location.locationTitle,
    locationTitle: location.locationTitle,
    lat: location.lat,
    lng: location.lng,
    scheduledDate: location.scheduledDate ?? '',
    originalLocationTitle: location.locationTitle,
    originalLat: location.lat,
    originalLng: location.lng,
  }));
}

function isExistingLocationUnchanged(row: PlannerRow) {
  return (
    Boolean(row.id) &&
    row.inputValue === row.originalLocationTitle &&
    row.locationTitle === row.originalLocationTitle &&
    row.lat === row.originalLat &&
    row.lng === row.originalLng
  );
}

function isCompleteRow(
  row: PlannerRow,
  startDateKey: string,
  endDateKey: string
) {
  const hasLocation =
    row.locationTitle.trim().length > 0 &&
    row.lat !== null &&
    row.lng !== null &&
    (Boolean(row.placeId) || isExistingLocationUnchanged(row));

  return (
    hasLocation &&
    isDateKeyWithinRange(row.scheduledDate, startDateKey, endDateKey)
  );
}

function toPayloadRows(rows: PlannerRow[]) {
  return rows.map((row) => ({
    id: row.id,
    clientId: row.clientId,
    locationTitle: row.locationTitle,
    lat: row.lat,
    lng: row.lng,
    scheduledDate: row.scheduledDate,
    placeId: row.placeId,
  }));
}

export default function ItineraryPlanner({
  mode,
  trip,
  initialLocations,
}: ItineraryPlannerProps) {
  const [rows, setRows] = useState(() => createInitialRows(initialLocations));
  const [deletedLocationIds, setDeletedLocationIds] = useState<string[]>([]);
  const [suggestionsByRow, setSuggestionsByRow] = useState<
    Record<string, PlaceSuggestion[]>
  >({});
  const [loadingSuggestionsFor, setLoadingSuggestionsFor] = useState<
    string | null
  >(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const nextRowNumberRef = useRef(initialLocations.length + 1);
  const suggestionTimeoutsRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const suggestionRequestIdsRef = useRef<Record<string, number>>({});
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const placesServiceElementRef = useRef<HTMLDivElement | null>(null);
  const action = useMemo(
    () =>
      mode === 'new'
        ? createItinerary.bind(null, trip.id)
        : saveItinerary.bind(null, trip.id),
    [mode, trip.id]
  );
  const [state, formAction, isPending] = useActionState(
    action,
    initialActionState
  );
  const { isLoaded, loadError } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: getGoogleMapsBrowserApiKey(),
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (!isLoaded || !placesServiceElementRef.current) {
      return;
    }

    autocompleteServiceRef.current =
      autocompleteServiceRef.current ??
      new google.maps.places.AutocompleteService();
    placesServiceRef.current =
      placesServiceRef.current ??
      new google.maps.places.PlacesService(placesServiceElementRef.current);
  }, [isLoaded]);

  useEffect(() => {
    const suggestionTimeouts = suggestionTimeoutsRef.current;
    return () => {
      for (const timeout of Object.values(suggestionTimeouts)) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const markers = useMemo<ItineraryPlannerMarker[]>(
    () =>
      rows
        .filter(
          (row) =>
            row.locationTitle.trim().length > 0 &&
            row.lat !== null &&
            row.lng !== null
        )
        .map((row) => ({
          id: row.clientId,
          locationTitle: row.locationTitle,
          lat: row.lat as number,
          lng: row.lng as number,
        })),
    [rows]
  );

  const isFormValid =
    rows.length > 0 &&
    rows.every((row) => isCompleteRow(row, trip.startDateKey, trip.endDateKey));
  const submitLabel = mode === 'new' ? 'Create itinerary' : 'Save itinerary';
  const pendingLabel =
    mode === 'new' ? 'Creating itinerary...' : 'Saving itinerary...';
  const displayedError = clientError ?? state.error;

  const scheduleSuggestions = (clientId: string, input: string) => {
    clearTimeout(suggestionTimeoutsRef.current[clientId]);
    suggestionRequestIdsRef.current[clientId] =
      (suggestionRequestIdsRef.current[clientId] ?? 0) + 1;
    const requestId = suggestionRequestIdsRef.current[clientId];

    if (input.trim().length < MIN_AUTOCOMPLETE_LENGTH) {
      setSuggestionsByRow((current) => ({ ...current, [clientId]: [] }));
      setLoadingSuggestionsFor(null);
      return;
    }

    suggestionTimeoutsRef.current[clientId] = setTimeout(() => {
      const service = autocompleteServiceRef.current;
      if (!service) {
        return;
      }

      setLoadingSuggestionsFor(clientId);
      service.getPlacePredictions({ input }, (predictions, status) => {
        if (suggestionRequestIdsRef.current[clientId] !== requestId) {
          return;
        }

        setLoadingSuggestionsFor(null);
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          setSuggestionsByRow((current) => ({ ...current, [clientId]: [] }));
          return;
        }

        setSuggestionsByRow((current) => ({
          ...current,
          [clientId]: predictions.slice(0, MAX_SUGGESTIONS).map((place) => ({
            placeId: place.place_id,
            description: place.description,
          })),
        }));
      });
    }, AUTOCOMPLETE_DELAY_MS);
  };

  const handleLocationInputChange = (
    row: PlannerRow,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setClientError(null);
    setRows((currentRows) =>
      currentRows.map((currentRow) => {
        if (currentRow.clientId !== row.clientId) {
          return currentRow;
        }

        if (
          currentRow.id &&
          value === currentRow.originalLocationTitle &&
          currentRow.originalLat !== undefined &&
          currentRow.originalLng !== undefined
        ) {
          return {
            ...currentRow,
            inputValue: value,
            locationTitle: currentRow.originalLocationTitle,
            lat: currentRow.originalLat,
            lng: currentRow.originalLng,
            placeId: undefined,
          };
        }

        return {
          ...currentRow,
          inputValue: value,
          locationTitle: value,
          lat: null,
          lng: null,
          placeId: undefined,
        };
      })
    );
    scheduleSuggestions(row.clientId, value);
  };

  const selectSuggestion = (row: PlannerRow, suggestion: PlaceSuggestion) => {
    const service = placesServiceRef.current;
    if (!service) {
      setClientError('Places autocomplete is still loading');
      return;
    }

    setClientError(null);
    service.getDetails(
      {
        placeId: suggestion.placeId,
        fields: ['formatted_address', 'geometry', 'name'],
      },
      (place, status) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !place?.geometry?.location
        ) {
          setClientError('Could not load the selected place');
          return;
        }

        const label =
          place.formatted_address ?? place.name ?? suggestion.description;
        setRows((currentRows) =>
          currentRows.map((currentRow) =>
            currentRow.clientId === row.clientId
              ? {
                  ...currentRow,
                  inputValue: label,
                  locationTitle: label,
                  lat: place.geometry?.location?.lat() ?? null,
                  lng: place.geometry?.location?.lng() ?? null,
                  placeId: suggestion.placeId,
                }
              : currentRow
          )
        );
        setSuggestionsByRow((current) => ({ ...current, [row.clientId]: [] }));
      }
    );
  };

  const addRow = () => {
    nextRowNumberRef.current += 1;
    setRows((currentRows) => [
      ...currentRows,
      {
        clientId: `new-row-${nextRowNumberRef.current}`,
        inputValue: '',
        locationTitle: '',
        lat: null,
        lng: null,
        scheduledDate: '',
      },
    ]);
  };

  const removeRow = (row: PlannerRow) => {
    setRows((currentRows) =>
      currentRows.filter((currentRow) => currentRow.clientId !== row.clientId)
    );
    setSuggestionsByRow((current) => ({ ...current, [row.clientId]: [] }));
    if (row.id) {
      setDeletedLocationIds((current) => [...current, row.id as string]);
    }
  };

  const updateRowDate = (row: PlannerRow, scheduledDate: string) => {
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.clientId === row.clientId
          ? { ...currentRow, scheduledDate }
          : currentRow
      )
    );
  };

  return (
    <form action={formAction} className="container mx-auto px-4 py-8">
      <input
        type="hidden"
        name="locations"
        value={JSON.stringify(toPayloadRows(rows))}
        readOnly
      />
      <input
        type="hidden"
        name="deletedLocationIds"
        value={JSON.stringify(deletedLocationIds)}
        readOnly
      />
      <div ref={placesServiceElementRef} className="hidden" aria-hidden />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-muted-foreground text-sm uppercase">
            {trip.title}
          </p>
          <h1 className="text-foreground text-3xl font-bold">
            {mode === 'new' ? 'Create itinerary' : 'Edit itinerary'}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {formatItineraryDateKey(trip.startDateKey)} -{' '}
            {formatItineraryDateKey(trip.endDateKey)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/trips/${trip.id}`}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={!isFormValid || isPending}>
            {isPending ? pendingLabel : submitLabel}
          </Button>
        </div>
      </div>

      {displayedError && (
        <p className="border-destructive/30 bg-destructive/10 text-destructive mb-4 rounded-md border px-4 py-3 text-sm">
          {displayedError}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-foreground text-xl font-semibold">
                Locations
              </h2>
              <p className="text-muted-foreground text-sm">
                Choose each place from autocomplete and schedule it inside the
                trip dates.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={addRow}>
              <Plus className="size-4" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {rows.map((row, index) => {
              const rowSuggestions = suggestionsByRow[row.clientId] ?? [];
              const rowIsValid = isCompleteRow(
                row,
                trip.startDateKey,
                trip.endDateKey
              );
              return (
                <div
                  key={row.clientId}
                  className="border-border bg-card text-card-foreground rounded-lg border p-4"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">Stop {index + 1}</h3>
                      <p
                        className={cn(
                          'text-sm',
                          rowIsValid
                            ? 'text-muted-foreground'
                            : 'text-destructive'
                        )}
                      >
                        {rowIsValid
                          ? 'Ready to save'
                          : 'Choose a place and date'}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(row)}
                      aria-label={`Remove stop ${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_170px]">
                    <div className="relative">
                      <label
                        className="mb-1 block text-sm font-medium"
                        htmlFor={`${row.clientId}-location`}
                      >
                        Location
                      </label>
                      <div className="relative">
                        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <input
                          id={`${row.clientId}-location`}
                          type="text"
                          value={row.inputValue}
                          onChange={(event) =>
                            handleLocationInputChange(row, event)
                          }
                          className="border-border bg-background focus:ring-primary/40 w-full rounded-md border py-2 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
                          placeholder="Search for a place"
                          autoComplete="off"
                        />
                      </div>
                      {loadingSuggestionsFor === row.clientId && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          Searching...
                        </p>
                      )}
                      {rowSuggestions.length > 0 && (
                        <div className="border-border bg-card absolute z-10 mt-1 w-full overflow-hidden rounded-md border shadow-xs">
                          {rowSuggestions.map((suggestion) => (
                            <button
                              key={suggestion.placeId}
                              type="button"
                              className="hover:bg-accent block w-full px-3 py-2 text-left text-sm"
                              onClick={() => selectSuggestion(row, suggestion)}
                            >
                              {suggestion.description}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        className="mb-1 block text-sm font-medium"
                        htmlFor={`${row.clientId}-date`}
                      >
                        Date
                      </label>
                      <input
                        id={`${row.clientId}-date`}
                        type="date"
                        min={trip.startDateKey}
                        max={trip.endDateKey}
                        value={row.scheduledDate}
                        onChange={(event) =>
                          updateRowDate(row, event.target.value)
                        }
                        className="border-border bg-background focus:ring-primary/40 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-border border-t pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isPending}
            >
              {isPending ? pendingLabel : submitLabel}
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="lg:sticky lg:top-24">
            <div className="border-border bg-muted/30 h-90 overflow-hidden rounded-lg border md:h-105 lg:h-115">
              <ItineraryPlannerMap
                isLoaded={isLoaded}
                loadError={loadError}
                markers={markers}
              />
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
