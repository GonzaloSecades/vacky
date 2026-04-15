'use client';

import ItineraryPlannerMap, {
  type ItineraryPlannerMarker,
} from '@/components/itinerary-planner-map';
import ItineraryPlaceTypeIcon from '@/components/itinerary-place-type-icon';
import { Button } from '@/components/ui/button';
import {
  createItinerary,
  saveItinerary,
  type ItineraryActionState,
} from '@/lib/actions/itinerary';
import {
  getGoogleMapsBrowserApiKey,
  getGoogleMapsMapId,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
} from '@/lib/google-maps';
import {
  formatItineraryDateKey,
  isDateKeyWithinRange,
} from '@/lib/itinerary-dates';
import {
  getPlaceCategoryLabel,
  getPlaceCategoryNotesPlaceholder,
  getPriceSentimentLabel,
  inferPlaceCategory,
  PRICE_SENTIMENT_OPTIONS,
  type LocationPlaceCategory,
  type LocationPriceSentiment,
} from '@/lib/location-metadata';
import { cn } from '@/lib/utils';
import { useJsApiLoader } from '@react-google-maps/api';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
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
  placeId: string | null;
  placeTypes: string[];
  placeCategory: LocationPlaceCategory | null;
  appreciation: number | null;
  priceSentiment: LocationPriceSentiment | null;
  notes: string | null;
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
  placeTypes: string[];
  placeCategory?: LocationPlaceCategory;
  appreciation?: number;
  priceSentiment?: LocationPriceSentiment;
  notes: string;
  originalLocationTitle?: string;
  originalLat?: number;
  originalLng?: number;
  originalPlaceId?: string;
  originalPlaceTypes?: string[];
  originalPlaceCategory?: LocationPlaceCategory;
  isExpanded: boolean;
}

interface PlaceSuggestion {
  placeId: string;
  description: string;
  placePrediction: google.maps.places.PlacePrediction;
}

interface SelectedPlaceDetails {
  label: string;
  placeId: string;
  placeTypes: string[];
  lat: number;
  lng: number;
}

const initialActionState: ItineraryActionState = {};
const AUTOCOMPLETE_DELAY_MS = 300;
const MIN_AUTOCOMPLETE_LENGTH = 3;
const MAX_SUGGESTIONS = 5;
const MARKER_FIELD_SEPARATOR = '\u001f';
const MARKER_ROW_SEPARATOR = '\u001e';
let placesLibraryPromise: Promise<google.maps.PlacesLibrary> | null = null;

function loadPlacesLibrary() {
  placesLibraryPromise ??= google.maps.importLibrary(
    'places'
  ) as Promise<google.maps.PlacesLibrary>;

  return placesLibraryPromise;
}

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
        placeTypes: [],
        notes: '',
        isExpanded: true,
      },
    ];
  }

  return initialLocations.map((location) => {
    const inferredPlaceCategory =
      location.placeTypes.length > 0
        ? inferPlaceCategory(location.placeTypes, location.locationTitle)
        : undefined;
    const placeCategory =
      location.placeCategory && location.placeCategory !== 'GENERIC'
        ? location.placeCategory
        : (inferredPlaceCategory ?? location.placeCategory ?? undefined);

    return {
      clientId: location.id,
      id: location.id,
      inputValue: location.locationTitle,
      locationTitle: location.locationTitle,
      lat: location.lat,
      lng: location.lng,
      scheduledDate: location.scheduledDate ?? '',
      placeId: location.placeId ?? undefined,
      placeTypes: location.placeTypes,
      placeCategory,
      appreciation: location.appreciation ?? undefined,
      priceSentiment: location.priceSentiment ?? undefined,
      notes: location.notes ?? '',
      originalLocationTitle: location.locationTitle,
      originalLat: location.lat,
      originalLng: location.lng,
      originalPlaceId: location.placeId ?? undefined,
      originalPlaceTypes: location.placeTypes,
      originalPlaceCategory: placeCategory,
      isExpanded: !location.scheduledDate,
    };
  });
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
    placeTypes: row.placeTypes,
    placeCategory: row.placeCategory,
    appreciation: row.appreciation,
    priceSentiment: row.priceSentiment,
    notes: row.notes,
  }));
}

function getDisplayCategory(row: PlannerRow): LocationPlaceCategory {
  if (row.placeCategory && row.placeCategory !== 'GENERIC') {
    return row.placeCategory;
  }

  if (row.placeTypes.length > 0) {
    return inferPlaceCategory(row.placeTypes, row.locationTitle);
  }

  return 'GENERIC';
}

function formatCoordinates(row: PlannerRow) {
  if (row.lat === null || row.lng === null) {
    return 'Coordinates appear after choosing a place.';
  }

  return `Lat ${row.lat.toFixed(5)}, Lng ${row.lng.toFixed(5)}`;
}

function getMarkerFingerprint(rows: PlannerRow[]) {
  const markerParts: string[] = [];

  for (const row of rows) {
    if (
      row.locationTitle.trim().length === 0 ||
      row.lat === null ||
      row.lng === null
    ) {
      continue;
    }

    markerParts.push(
      [
        row.clientId,
        row.locationTitle,
        row.lat,
        row.lng,
        row.placeId ?? '',
        row.placeCategory ?? '',
        row.placeTypes.join(MARKER_FIELD_SEPARATOR),
        getDisplayCategory(row),
        row.appreciation ?? '',
        row.priceSentiment ?? '',
      ].join(MARKER_FIELD_SEPARATOR)
    );
  }

  return markerParts.join(MARKER_ROW_SEPARATOR);
}

async function getSelectedPlaceDetails(
  suggestion: PlaceSuggestion
): Promise<SelectedPlaceDetails> {
  const place = suggestion.placePrediction.toPlace();

  await place.fetchFields({
    fields: ['formattedAddress', 'location', 'displayName', 'id', 'types'],
  });

  if (!place.location) {
    throw new Error('Could not load the selected place');
  }

  return {
    label: place.displayName ?? place.formattedAddress ?? suggestion.description,
    placeId: place.id ?? suggestion.placeId,
    placeTypes: place.types ?? [],
    lat: place.location.lat(),
    lng: place.location.lng(),
  };
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
  const [isLocationsHeaderVisible, setIsLocationsHeaderVisible] =
    useState(true);
  const nextRowNumberRef = useRef(initialLocations.length + 1);
  const locationsHeaderRef = useRef<HTMLDivElement | null>(null);
  const pendingFocusClientIdRef = useRef<string | null>(null);
  const stopCardRefsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const locationInputRefsRef = useRef<Record<string, HTMLInputElement | null>>(
    {}
  );
  const suggestionTimeoutsRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const suggestionRequestIdsRef = useRef<Record<string, number>>({});
  const autocompleteSessionTokensRef = useRef<
    Record<string, google.maps.places.AutocompleteSessionToken>
  >({});
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
    mapIds: [getGoogleMapsMapId()],
  });

  useEffect(() => {
    const suggestionTimeouts = suggestionTimeoutsRef.current;
    return () => {
      for (const timeout of Object.values(suggestionTimeouts)) {
        clearTimeout(timeout);
      }
    };
  }, []);

  useEffect(() => {
    const locationsHeader = locationsHeaderRef.current;
    if (!locationsHeader || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLocationsHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(locationsHeader);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const clientId = pendingFocusClientIdRef.current;
    if (!clientId) {
      return;
    }

    const stopCard = stopCardRefsRef.current[clientId];
    const locationInput = locationInputRefsRef.current[clientId];
    if (!stopCard || !locationInput) {
      return;
    }

    pendingFocusClientIdRef.current = null;
    stopCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.requestAnimationFrame(() => {
      locationInput.focus({ preventScroll: true });
    });
  }, [rows]);

  const locationsPayload = useMemo(
    () => JSON.stringify(toPayloadRows(rows)),
    [rows]
  );
  const deletedIdsPayload = useMemo(
    () => JSON.stringify(deletedLocationIds),
    [deletedLocationIds]
  );
  const isFormValid = useMemo(
    () =>
      rows.length > 0 &&
      rows.every((row) =>
        isCompleteRow(row, trip.startDateKey, trip.endDateKey)
      ),
    [rows, trip.startDateKey, trip.endDateKey]
  );
  const markerFingerprint = useMemo(() => getMarkerFingerprint(rows), [rows]);
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
          placeCategory: getDisplayCategory(row),
          placeId: row.placeId,
          placeTypes: row.placeTypes,
          appreciation: row.appreciation,
          priceSentiment: row.priceSentiment,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recompute only when marker-relevant row fields change
    [markerFingerprint]
  );

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
      delete autocompleteSessionTokensRef.current[clientId];
      return;
    }

    suggestionTimeoutsRef.current[clientId] = setTimeout(async () => {
      if (!isLoaded) {
        return;
      }

      setLoadingSuggestionsFor(clientId);
      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } =
          await loadPlacesLibrary();

        if (suggestionRequestIdsRef.current[clientId] !== requestId) {
          return;
        }

        const sessionToken =
          autocompleteSessionTokensRef.current[clientId] ??
          new AutocompleteSessionToken();
        autocompleteSessionTokensRef.current[clientId] = sessionToken;

        const { suggestions } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken,
          });

        if (suggestionRequestIdsRef.current[clientId] !== requestId) {
          return;
        }

        setSuggestionsByRow((current) => ({
          ...current,
          [clientId]: suggestions
            .flatMap((suggestion) => {
              const placePrediction = suggestion.placePrediction;
              if (!placePrediction) {
                return [];
              }

              return [
                {
                  placeId: placePrediction.placeId,
                  description: placePrediction.text.text,
                  placePrediction,
                },
              ];
            })
            .slice(0, MAX_SUGGESTIONS),
        }));
      } catch {
        if (suggestionRequestIdsRef.current[clientId] === requestId) {
          setSuggestionsByRow((current) => ({ ...current, [clientId]: [] }));
        }
      } finally {
        if (suggestionRequestIdsRef.current[clientId] === requestId) {
          setLoadingSuggestionsFor(null);
        }
      }
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
            placeId: currentRow.originalPlaceId,
            placeTypes: currentRow.originalPlaceTypes ?? [],
            placeCategory: currentRow.originalPlaceCategory,
          };
        }

        return {
          ...currentRow,
          inputValue: value,
          locationTitle: value,
          lat: null,
          lng: null,
          placeId: undefined,
          placeTypes: [],
          placeCategory: undefined,
        };
      })
    );
    scheduleSuggestions(row.clientId, value);
  };

  const selectSuggestion = async (
    row: PlannerRow,
    suggestion: PlaceSuggestion
  ) => {
    if (!isLoaded) {
      setClientError('Places autocomplete is still loading');
      return;
    }

    setClientError(null);

    try {
      const place = await getSelectedPlaceDetails(suggestion);
      setRows((currentRows) =>
        currentRows.map((currentRow) =>
          currentRow.clientId === row.clientId
            ? {
                ...currentRow,
                inputValue: place.label,
                locationTitle: place.label,
                lat: place.lat,
                lng: place.lng,
                placeId: place.placeId,
                placeTypes: place.placeTypes,
                placeCategory: inferPlaceCategory(
                  place.placeTypes,
                  place.label
                ),
              }
            : currentRow
        )
      );
      setSuggestionsByRow((current) => ({ ...current, [row.clientId]: [] }));
    } catch {
      setClientError('Could not load the selected place');
    } finally {
      delete autocompleteSessionTokensRef.current[row.clientId];
    }
  };

  const addRow = () => {
    nextRowNumberRef.current += 1;
    const clientId = `new-row-${nextRowNumberRef.current}`;
    pendingFocusClientIdRef.current = clientId;
    setRows((currentRows) => [
      ...currentRows,
      {
        clientId,
        inputValue: '',
        locationTitle: '',
        lat: null,
        lng: null,
        scheduledDate: '',
        placeTypes: [],
        notes: '',
        isExpanded: true,
      },
    ]);
  };

  const removeRow = (row: PlannerRow) => {
    setRows((currentRows) =>
      currentRows.filter((currentRow) => currentRow.clientId !== row.clientId)
    );
    setSuggestionsByRow((current) => ({ ...current, [row.clientId]: [] }));
    delete autocompleteSessionTokensRef.current[row.clientId];
    delete stopCardRefsRef.current[row.clientId];
    delete locationInputRefsRef.current[row.clientId];
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

  const toggleRowExpanded = (row: PlannerRow) => {
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.clientId === row.clientId
          ? { ...currentRow, isExpanded: !currentRow.isExpanded }
          : currentRow
      )
    );
  };

  const updateRowAppreciation = (
    row: PlannerRow,
    appreciation: number | undefined
  ) => {
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.clientId === row.clientId
          ? { ...currentRow, appreciation }
          : currentRow
      )
    );
  };

  const updateRowPriceSentiment = (
    row: PlannerRow,
    priceSentiment: LocationPriceSentiment | undefined
  ) => {
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.clientId === row.clientId
          ? { ...currentRow, priceSentiment }
          : currentRow
      )
    );
  };

  const updateRowNotes = (row: PlannerRow, notes: string) => {
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.clientId === row.clientId
          ? { ...currentRow, notes }
          : currentRow
      )
    );
  };

  return (
    <form
      action={formAction}
      className="container mx-auto max-w-full px-4 py-8"
    >
      <input
        type="hidden"
        name="locations"
        value={locationsPayload}
        readOnly
      />
      <input
        type="hidden"
        name="deletedLocationIds"
        value={deletedIdsPayload}
        readOnly
      />
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

      <div className="grid max-w-full gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(240px,0.9fr)] md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <section className="min-w-0 space-y-4">
          <div
            ref={locationsHeaderRef}
            className="flex items-center justify-between gap-4"
          >
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
              const displayCategory = getDisplayCategory(row);
              const scheduledDateLabel = isDateKeyWithinRange(
                row.scheduledDate,
                trip.startDateKey,
                trip.endDateKey
              )
                ? formatItineraryDateKey(row.scheduledDate)
                : 'Choose a date';

              return (
                <div
                  key={row.clientId}
                  ref={(node) => {
                    stopCardRefsRef.current[row.clientId] = node;
                  }}
                  className="border-border bg-card text-card-foreground max-w-full rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium">
                          Stop {index + 1}
                        </span>
                        <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                          <ItineraryPlaceTypeIcon
                            placeTypes={row.placeTypes}
                            category={displayCategory}
                            className="size-3.5"
                          />
                          {getPlaceCategoryLabel(displayCategory)}
                        </span>
                      </div>
                      <h3 className="truncate font-medium">
                        {row.locationTitle || 'Choose a place'}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {scheduledDateLabel}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {row.appreciation && (
                          <span className="border-border text-muted-foreground inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs">
                            <Star className="size-3.5 fill-current" />
                            {row.appreciation}/5
                          </span>
                        )}
                        {row.priceSentiment && (
                          <span className="border-border text-muted-foreground rounded-md border px-2 py-1 text-xs">
                            {getPriceSentimentLabel(row.priceSentiment)}
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          'mt-2 text-sm',
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
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpanded(row)}
                        aria-expanded={row.isExpanded}
                      >
                        {row.isExpanded ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                        {row.isExpanded ? 'Collapse' : 'Expand'}
                      </Button>
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
                  </div>

                  {row.isExpanded && (
                    <div className="border-border mt-4 space-y-4 border-t pt-4">
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
                              ref={(node) => {
                                locationInputRefsRef.current[row.clientId] =
                                  node;
                              }}
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
                                  onClick={() =>
                                    selectSuggestion(row, suggestion)
                                  }
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
                            Scheduled date
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

                      <p className="text-muted-foreground text-xs">
                        {formatCoordinates(row)}
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <fieldset>
                          <legend className="mb-2 text-sm font-medium">
                            Your rating
                          </legend>
                          <div className="flex flex-wrap gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() =>
                                  updateRowAppreciation(
                                    row,
                                    row.appreciation === rating
                                      ? undefined
                                      : rating
                                  )
                                }
                                className={cn(
                                  'border-border hover:bg-accent rounded-md border p-2 transition-colors',
                                  row.appreciation &&
                                    row.appreciation >= rating &&
                                    'bg-accent text-accent-foreground'
                                )}
                                aria-pressed={
                                  row.appreciation
                                    ? row.appreciation >= rating
                                    : false
                                }
                                aria-label={`Set Your rating to ${rating}`}
                              >
                                <Star
                                  className={cn(
                                    'size-4',
                                    row.appreciation &&
                                      row.appreciation >= rating &&
                                      'fill-current'
                                  )}
                                />
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <div>
                          <label
                            className="mb-2 block text-sm font-medium"
                            htmlFor={`${row.clientId}-price-sentiment`}
                          >
                            Cost feel
                          </label>
                          <select
                            id={`${row.clientId}-price-sentiment`}
                            value={row.priceSentiment ?? ''}
                            onChange={(event) =>
                              updateRowPriceSentiment(
                                row,
                                event.target.value
                                  ? (event.target
                                      .value as LocationPriceSentiment)
                                  : undefined
                              )
                            }
                            className="border-border bg-background focus:ring-primary/40 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                          >
                            <option value="">No cost feel</option>
                            {PRICE_SENTIMENT_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          className="mb-1 block text-sm font-medium"
                          htmlFor={`${row.clientId}-notes`}
                        >
                          Notes
                        </label>
                        <textarea
                          id={`${row.clientId}-notes`}
                          value={row.notes}
                          onChange={(event) =>
                            updateRowNotes(row, event.target.value)
                          }
                          className="border-border bg-background focus:ring-primary/40 min-h-24 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                          placeholder={getPlaceCategoryNotesPlaceholder(
                            displayCategory
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-border space-y-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:hidden"
              onClick={addRow}
            >
              <Plus className="size-4" />
              Add
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isPending}
            >
              {isPending ? pendingLabel : submitLabel}
            </Button>
          </div>
        </section>

        <section className="min-w-0 space-y-4 sm:sticky sm:top-24 sm:self-start">
          <div>
            <div className="border-border bg-muted/30 h-90 w-full max-w-full overflow-hidden rounded-lg border md:h-105 lg:h-115">
              <ItineraryPlannerMap
                isLoaded={isLoaded}
                loadError={loadError}
                markers={markers}
              />
            </div>
            {!isLocationsHeaderVisible && (
              <Button
                type="button"
                variant="outline"
                className="mt-3 hidden w-full sm:flex"
                onClick={addRow}
              >
                <Plus className="size-4" />
                Add
              </Button>
            )}
          </div>
        </section>
      </div>
    </form>
  );
}
