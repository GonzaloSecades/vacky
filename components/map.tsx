'use client';
import { Location } from '@/app/generated/prisma';
import CanvasLoader from '@/components/canvas-loader';
import GoogleMapAdvancedMarker from '@/components/google-map-advanced-marker';
import {
  getGoogleMapsBrowserApiKey,
  getGoogleMapsMapId,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
} from '@/lib/google-maps';
import {
  inferPlaceCategory,
  isLocationPlaceCategory,
  isLocationPriceSentiment,
} from '@/lib/location-metadata';
import { fitMapToPoints, getMapFitSignature } from '@/lib/map-bounds';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { LocateFixed } from 'lucide-react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

interface MapProps {
  itineraries: Location[];
}

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0,
};
const DEFAULT_ZOOM = 2;
const SINGLE_MARKER_ZOOM = 12;

function getLocationMapCategory(location: Location) {
  const storedCategory = isLocationPlaceCategory(location.placeCategory)
    ? location.placeCategory
    : 'GENERIC';

  if (storedCategory !== 'GENERIC') {
    return storedCategory;
  }

  return inferPlaceCategory(location.placeTypes, location.locationTitle);
}

export default function Map({ itineraries }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const lastAutoFitSignatureRef = useRef<string | null>(null);
  const markerFitSignature = getMapFitSignature(itineraries);
  const shouldShowMapContent = isMapReady;
  const { isLoaded, loadError } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: getGoogleMapsBrowserApiKey(),
    libraries: GOOGLE_MAPS_LIBRARIES,
    mapIds: [getGoogleMapsMapId()],
  });

  const fitToItineraries = useCallback(() => {
    if (!map || !isLoaded) {
      return;
    }

    fitMapToPoints(map, itineraries, {
      defaultCenter: DEFAULT_CENTER,
      defaultZoom: DEFAULT_ZOOM,
      singlePointZoom: SINGLE_MARKER_ZOOM,
    });
  }, [isLoaded, itineraries, map]);

  useEffect(() => {
    if (!map || !isLoaded || !isMapReady) {
      return;
    }

    if (lastAutoFitSignatureRef.current === markerFitSignature) {
      return;
    }

    lastAutoFitSignatureRef.current = markerFitSignature;
    fitMapToPoints(map, itineraries, {
      defaultCenter: DEFAULT_CENTER,
      defaultZoom: DEFAULT_ZOOM,
      singlePointZoom: SINGLE_MARKER_ZOOM,
    });
  }, [isLoaded, isMapReady, itineraries, map, markerFitSignature]);

  if (loadError)
    return <div className="text-muted-foreground">Error loading maps</div>;

  if (!isLoaded) {
    return <CanvasLoader label="Loading map" />;
  }
  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={DEFAULT_ZOOM}
        center={DEFAULT_CENTER}
        onIdle={() => setIsMapReady(true)}
        onLoad={(loadedMap) => {
          lastAutoFitSignatureRef.current = null;
          setIsMapReady(false);
          setMap(loadedMap);
        }}
        onUnmount={() => {
          lastAutoFitSignatureRef.current = null;
          setIsMapReady(false);
          setMap(null);
        }}
        options={{
          mapId: getGoogleMapsMapId(),
          controlSize: 0,
          gestureHandling: 'greedy',
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {shouldShowMapContent ? (
          <Suspense fallback={null}>
            {itineraries.map((location) => {
              return (
                <GoogleMapAdvancedMarker
                  key={location.id}
                  map={map}
                  title={location.locationTitle}
                  position={{ lat: location.lat, lng: location.lng }}
                  category={getLocationMapCategory(location)}
                  placeId={location.placeId}
                  placeTypes={location.placeTypes}
                  appreciation={location.appreciation}
                  priceSentiment={
                    isLocationPriceSentiment(location.priceSentiment)
                      ? location.priceSentiment
                      : undefined
                  }
                />
              );
            })}
          </Suspense>
        ) : null}
      </GoogleMap>
      {!shouldShowMapContent ? (
        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-md">
          <CanvasLoader label="Loading map" />
        </div>
      ) : null}
      {shouldShowMapContent ? (
        <button
          type="button"
          onClick={fitToItineraries}
          className="travel-map-action absolute top-4 right-4 z-10"
        >
          <LocateFixed className="size-3.5" />
          Reset
        </button>
      ) : null}
    </div>
  );
}
