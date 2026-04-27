'use client';

import CanvasLoader from '@/components/canvas-loader';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';

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

const GlobeClient = dynamic(() => import('@/components/globe-client'), {
  ssr: false,
  loading: () => <CanvasLoader label="Loading globe" />,
});

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
          currentDimensions.width === nextSize &&
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
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="space-y-8">
        <section className="travel-panel relative overflow-hidden p-7 md:p-9">
          <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_center,rgba(86,136,212,0.14),transparent_72%)] blur-3xl" />
          <div className="relative max-w-3xl space-y-4">
            <div className="travel-kicker">Globe</div>
            <h1 className="travel-section-title text-foreground md:text-5xl">
              Your travel footprint, gathered into one calmer world view.
            </h1>
            <p className="text-muted-foreground text-base leading-7 md:text-lg">
              Scan visited countries, revisit the places that shaped them, and
              keep the globe as the broadest memory surface in the app.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="travel-panel overflow-hidden p-5 md:p-6">
            <div className="mb-5">
              <p className="text-muted-foreground text-sm font-medium">
                World view
              </p>
              <h2 className="travel-section-title text-foreground mt-1 md:text-[2.65rem]">
                Places you&apos;ve already touched
              </h2>
            </div>
            <div
              ref={globeContainerRef}
              className="relative flex min-h-8 w-full items-center justify-center rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(247,247,247,0.95))] py-6 lg:min-h-140"
            >
              {isLoading || !globeDimensions ? (
                <CanvasLoader label="Loading globe" />
              ) : (
                <GlobeClient
                  globeRef={globeRef}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  backgroundColor="rgba(0,0,0,0)"
                  pointColor={() => '#7B5EA7'}
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

          <aside className="space-y-5">
            <div className="travel-panel p-6">
              <p className="text-muted-foreground text-sm font-medium">
                Summary
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="travel-soft-panel p-4">
                  <p className="text-muted-foreground text-sm font-medium">
                    Countries
                  </p>
                  <p className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.04em]">
                    {isLoading ? '...' : visitedCountries.size}
                  </p>
                </div>
                <div className="travel-soft-panel p-4">
                  <p className="text-muted-foreground text-sm font-medium">
                    Saved points
                  </p>
                  <p className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.04em]">
                    {isLoading ? '...' : locations.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="travel-panel p-6">
              <h2 className="travel-section-title text-foreground text-[2rem]">
                Visited countries
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                A quick read on where your saved locations have taken you so
                far.
              </p>
              {isLoading ? (
                <div className="mt-6">
                  <CanvasLoader label="Loading countries" />
                </div>
              ) : (
                <div className="mt-6 max-h-120 space-y-3 overflow-y-auto pr-1">
                  {Array.from(visitedCountries).map((country) => (
                    <div
                      key={country}
                      className="travel-soft-panel flex items-center gap-3 p-4"
                    >
                      <div className="bg-accent text-primary rounded-full p-2.5">
                        <MapPin className="size-4" />
                      </div>
                      <p className="text-foreground text-sm font-semibold">
                        {country}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
