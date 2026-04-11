'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ItineraryPlannerMarker {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
}

interface ItineraryPlannerMapProps {
  isLoaded: boolean;
  loadError?: Error;
  markers: ItineraryPlannerMarker[];
}

const ARGENTINA_CENTER = {
  lat: -38.4161,
  lng: -63.6167,
};
const ARGENTINA_ZOOM = 4;
const SINGLE_MARKER_ZOOM = 12;

export default function ItineraryPlannerMap({
  isLoaded,
  loadError,
  markers,
}: ItineraryPlannerMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!map || !isLoaded) {
      return;
    }

    if (markers.length === 0) {
      map.setCenter(ARGENTINA_CENTER);
      map.setZoom(ARGENTINA_ZOOM);
      return;
    }

    if (markers.length === 1) {
      map.setCenter({
        lat: markers[0].lat,
        lng: markers[0].lng,
      });
      map.setZoom(SINGLE_MARKER_ZOOM);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    for (const marker of markers) {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    }
    map.fitBounds(bounds);
  }, [isLoaded, map, markers]);

  if (loadError) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center gap-2">
        <MapIcon className="size-5" />
        <p>Loading map</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={ARGENTINA_ZOOM}
      center={ARGENTINA_CENTER}
      onLoad={(loadedMap) => setMap(loadedMap)}
      onUnmount={() => setMap(null)}
      options={{
        controlSize: 24,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      mapTypeId="terrain"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          title={marker.locationTitle}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  );
}
