'use client';
import { Location } from '@/app/generated/prisma';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { MapIcon } from 'lucide-react';

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div className="text-muted-foreground">Error loading maps</div>;

  if (!isLoaded) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2">
        <MapIcon className="size-5" />
        <p>Loading map</p>
      </div>
    );
  }
  const center =
    itineraries.length > 0
      ? {
          lat: itineraries[0].lat,
          lng: itineraries[0].lng,
        }
      : {
          lat: 0,
          lng: 0,
        };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={12}
      center={center}
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
