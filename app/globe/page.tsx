'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}
export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        setVisitedCountries(countries);
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: -34.6037,
        lng: -58.3816,
        altitude: 2,
      });
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-12 text-center text-4xl font-bold">
            Your travel journey
          </h1>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-lg lg:col-span-2">
              <div className="p-6">
                <h2 className="text-2xl font-bold">Your Travel Map</h2>
                <div className="relative h-150 w-full">
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      backgroundColor="rgba(0,0,0,0)"
                      pointColor={() => '#FF5733'}
                      pointLabel="name"
                      pointsData={locations}
                      pointRadius={0.5}
                      pointAltitude={0.1}
                      pointsMerge={true}
                      width={800}
                      height={600}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Visited Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm text-blue-500">
                          You&apos;ve visited{' '}
                          <span className="font-bold">
                            {visitedCountries.size}
                          </span>{' '}
                          {visitedCountries.size === 1
                            ? 'country'
                            : 'countries'}
                        </p>
                      </div>
                      <div className="max-h-125 space-y-2 overflow-y-auto pr-2">
                        {Array.from(visitedCountries).map((country, key) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                          >
                            <MapPin className="size-4 text-red-500" />
                            <p className="font text-sm font-medium text-gray-700">
                              {country}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
