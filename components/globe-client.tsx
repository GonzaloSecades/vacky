'use client';

import type { MutableRefObject } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';

interface GlobeClientProps extends GlobeProps {
  globeRef?: MutableRefObject<GlobeMethods | undefined>;
}

export default function GlobeClient({ globeRef, ...props }: GlobeClientProps) {
  return <Globe ref={globeRef} {...props} />;
}
