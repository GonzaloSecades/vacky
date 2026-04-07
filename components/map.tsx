'use cleint';
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
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <MapIcon className="" />
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

  if (loadError) return <div>Error loading maps</div>;
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
      {itineraries.map((location, key) => {
        return (
          <Marker
            key={key}
            position={{ lat: location.lat, lng: location.lng }}
          />
        );
      })}
    </GoogleMap>
  );
}
