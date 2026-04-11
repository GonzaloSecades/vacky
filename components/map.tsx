'use client';
import { Location } from '@/app/generated/prisma';
import {
  getGoogleMapsBrowserApiKey,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
} from '@/lib/google-maps';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MapIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MapProps {
  itineraries: Location[];
}

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0,
};
const DEFAULT_ZOOM = 2;
const SINGLE_MARKER_ZOOM = 12;

export default function Map({ itineraries }: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: getGoogleMapsBrowserApiKey(),
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    if (!map || !isLoaded) {
      return;
    }

    if (itineraries.length === 0) {
      map.setCenter(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    if (itineraries.length === 1) {
      map.setCenter({
        lat: itineraries[0].lat,
        lng: itineraries[0].lng,
      });
      map.setZoom(SINGLE_MARKER_ZOOM);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    for (const location of itineraries) {
      bounds.extend({ lat: location.lat, lng: location.lng });
    }
    map.fitBounds(bounds);
  }, [isLoaded, itineraries, map]);

  if (loadError)
    return <div className="text-muted-foreground">Error loading maps</div>;

  if (!isLoaded) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2">
        <MapIcon className="size-5" />
        <p>Loading map</p>
      </div>
    );
  }
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={DEFAULT_ZOOM}
      center={DEFAULT_CENTER}
      onLoad={(loadedMap) => setMap(loadedMap)}
      onUnmount={() => setMap(null)}
      options={{
        controlSize: 0,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      mapTypeId="terrain"
    >
      {itineraries.map((location) => {
        return (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
          />
        );
      })}
    </GoogleMap>
  );
}
