'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

interface GlobeDimensions {
  height: number;
  width: number;
}

const MIN_GLOBE_SIZE = 280;
const MAX_GLOBE_SIZE = 560;

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [globeDimensions, setGlobeDimensions] =
    useState<GlobeDimensions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) {
      return;
    }

    globeRef.current.pointOfView({
      lat: -34.6037,
      lng: -58.3816,
      altitude: 2,
    });
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 1;
  }, []);

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
    const globeContainer = globeContainerRef.current;

    if (!globeContainer) {
      return;
    }

    const updateGlobeDimensions = () => {
      const nextWidth = Math.floor(globeContainer.clientWidth);

      if (!nextWidth) {
        return;
      }

      const nextSize =
        nextWidth < MIN_GLOBE_SIZE
          ? nextWidth
          : Math.min(nextWidth, MAX_GLOBE_SIZE);

      setGlobeDimensions((currentDimensions) => {
        if (
          currentDimensions &&
          currentDimensions?.width === nextSize &&
          currentDimensions.height === nextSize
        ) {
          return currentDimensions;
        }

        return {
          height: nextSize,
          width: nextSize,
        };
      });
    };

    updateGlobeDimensions();

    const resizeObserver = new ResizeObserver(updateGlobeDimensions);
    resizeObserver.observe(globeContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="from-background to-muted/30 min-h-screen bg-linear-to-b">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-foreground mb-12 text-center text-4xl font-bold">
            Your travel journey
          </h1>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="bg-card text-card-foreground overflow-hidden rounded-xl border border-border shadow-sm lg:col-span-2">
              <div className="p-6">
                <h2 className="text-foreground text-2xl font-bold">
                  Your Travel Map
                </h2>
                <div
                  ref={globeContainerRef}
                  className="relative flex min-h-[320px] w-full items-center justify-center py-6 lg:min-h-[560px]"
                >
                  {isLoading || !globeDimensions ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
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
                      width={globeDimensions.width}
                      height={globeDimensions.height}
                      onGlobeReady={handleGlobeReady}
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
                      <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-muted text-foreground rounded-lg border border-border p-4">
                        <p className="text-sm">
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
                            className="hover:bg-accent flex items-center space-x-2 rounded-lg border border-border p-3 transition-colors"
                          >
                            <MapPin className="size-4 text-red-500" />
                            <p className="text-foreground text-sm font-medium">
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
