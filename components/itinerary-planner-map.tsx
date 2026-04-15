'use client';

import CanvasLoader from '@/components/canvas-loader';
import GoogleMapAdvancedMarker from '@/components/google-map-advanced-marker';
import { getGoogleMapsMapId } from '@/lib/google-maps';
import {
  fitMapToPoints,
  getMapCenterFromPoints,
  getMapFitSignature,
} from '@/lib/map-bounds';
import type {
  LocationPlaceCategory,
  LocationPriceSentiment,
} from '@/lib/location-metadata';
import { GoogleMap } from '@react-google-maps/api';
import { LocateFixed } from 'lucide-react';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface ItineraryPlannerMarker {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  placeCategory: LocationPlaceCategory;
  placeId?: string;
  placeTypes: string[];
  appreciation?: number;
  priceSentiment?: LocationPriceSentiment;
}

interface ItineraryPlannerMapProps {
  isLoaded: boolean;
  loadError?: Error;
  markers: ItineraryPlannerMarker[];
}

const EMPTY_MAP_CENTER = {
  lat: 0,
  lng: 0,
};
const EMPTY_MAP_ZOOM = 2;
const MARKER_OVERVIEW_ZOOM = 4;
const SINGLE_MARKER_ZOOM = 12;
const MAP_CONTAINER_STYLE = { width: '100%', height: '100%' } as const;
const MAP_OPTIONS: google.maps.MapOptions = {
  mapId: getGoogleMapsMapId(),
  controlSize: 24,
  gestureHandling: 'greedy',
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

function getInitialMapView(markers: readonly ItineraryPlannerMarker[]) {
  return {
    center: getMapCenterFromPoints(markers) ?? EMPTY_MAP_CENTER,
    zoom:
      markers.length === 0
        ? EMPTY_MAP_ZOOM
        : markers.length === 1
          ? SINGLE_MARKER_ZOOM
          : MARKER_OVERVIEW_ZOOM,
  };
}

export default function ItineraryPlannerMap({
  isLoaded,
  loadError,
  markers,
}: ItineraryPlannerMapProps) {
  if (loadError) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return <CanvasLoader label="Loading map" />;
  }

  return <LoadedItineraryPlannerMap markers={markers} />;
}

function LoadedItineraryPlannerMap({
  markers,
}: Pick<ItineraryPlannerMapProps, 'markers'>) {
  const [initialMapView] = useState(() => getInitialMapView(markers));
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const markersRef = useRef(markers);
  // eslint-disable-next-line react-hooks/refs -- keep Google Maps callbacks in sync before effects run
  markersRef.current = markers;
  const lastAutoFitSignatureRef = useRef<string | null>(null);
  const markerFitSignature = useMemo(
    () => getMapFitSignature(markers),
    [markers]
  );
  const shouldShowMapContent = isMapReady;

  const fitToMarkers = useCallback(() => {
    if (!map) {
      return;
    }

    fitMapToPoints(map, markersRef.current, {
      defaultCenter: EMPTY_MAP_CENTER,
      defaultZoom: EMPTY_MAP_ZOOM,
      singlePointZoom: SINGLE_MARKER_ZOOM,
    });
  }, [map]);

  const handleMapIdle = useCallback(() => {
    setIsMapReady(true);
  }, []);

  const handleMapLoad = useCallback((loadedMap: google.maps.Map) => {
    lastAutoFitSignatureRef.current = null;
    setIsMapReady(false);
    setMap(loadedMap);
  }, []);

  const handleMapUnmount = useCallback(() => {
    lastAutoFitSignatureRef.current = null;
    setIsMapReady(false);
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map || !isMapReady) {
      return;
    }

    if (lastAutoFitSignatureRef.current === markerFitSignature) {
      return;
    }

    lastAutoFitSignatureRef.current = markerFitSignature;
    fitMapToPoints(map, markersRef.current, {
      defaultCenter: EMPTY_MAP_CENTER,
      defaultZoom: EMPTY_MAP_ZOOM,
      singlePointZoom: SINGLE_MARKER_ZOOM,
    });
  }, [isMapReady, map, markerFitSignature]);

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        zoom={initialMapView.zoom}
        center={initialMapView.center}
        onIdle={handleMapIdle}
        onLoad={handleMapLoad}
        onUnmount={handleMapUnmount}
        options={MAP_OPTIONS}
        mapTypeId="terrain"
      >
        {shouldShowMapContent ? (
          <Suspense fallback={null}>
            {markers.map((marker) => (
              <GoogleMapAdvancedMarker
                key={marker.id}
                map={map}
                title={marker.locationTitle}
                position={{ lat: marker.lat, lng: marker.lng }}
                category={marker.placeCategory}
                placeId={marker.placeId}
                placeTypes={marker.placeTypes}
                appreciation={marker.appreciation}
                priceSentiment={marker.priceSentiment}
              />
            ))}
          </Suspense>
        ) : null}
      </GoogleMap>
      {!shouldShowMapContent ? (
        <div className="bg-background/80 absolute inset-0 z-20 backdrop-blur-sm">
          <CanvasLoader label="Loading map" />
        </div>
      ) : null}
      {shouldShowMapContent ? (
        <button
          type="button"
          onClick={fitToMarkers}
          className="bg-background/95 text-foreground border-border hover:bg-accent absolute top-3 right-3 z-10 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium shadow-sm backdrop-blur transition-colors"
        >
          <LocateFixed className="size-3.5" />
          Reset
        </button>
      ) : null}
    </div>
  );
}
