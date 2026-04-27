'use client';

import { MAKI_ICON_PATHS } from '@/components/itinerary-place-type-icon';
import {
  getLocationPlaceIconKey,
  getPlaceCategoryLabel,
  getPriceSentimentLabel,
  type LocationPlaceCategory,
  type LocationPriceSentiment,
} from '@/lib/location-metadata';
import { memo, use, useEffect, useEffectEvent, useRef } from 'react';

export interface GoogleMapAdvancedMarkerProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  title?: string;
  category?: LocationPlaceCategory;
  placeId?: string | null;
  placeTypes?: string[];
  appreciation?: number | null;
  priceSentiment?: LocationPriceSentiment | null;
}

let markerLibraryPromise: Promise<google.maps.MarkerLibrary> | null = null;
let activeInfoWindow: google.maps.InfoWindow | null = null;
const EMPTY_PLACE_TYPES: string[] = [];
const markerContentCache = new Map<LocationPlaceCategory, HTMLElement>();

const CATEGORY_MARKER_PALETTE: Record<
  LocationPlaceCategory,
  { fill: string; stroke: string; icon: string; shadow: string }
> = {
  TRANSPORTATION: {
    fill: '#BAE6FD',
    stroke: '#38BDF8',
    icon: '#075985',
    shadow: 'rgba(14, 116, 144, 0.22)',
  },
  ACCOMMODATION: {
    fill: '#DDD6FE',
    stroke: '#A78BFA',
    icon: '#5B21B6',
    shadow: 'rgba(109, 40, 217, 0.2)',
  },
  FOOD: {
    fill: '#FED7AA',
    stroke: '#FB923C',
    icon: '#9A3412',
    shadow: 'rgba(194, 65, 12, 0.2)',
  },
  LANDSCAPE: {
    fill: '#BBF7D0',
    stroke: '#4ADE80',
    icon: '#166534',
    shadow: 'rgba(21, 128, 61, 0.2)',
  },
  LANDMARK: {
    fill: '#FEF08A',
    stroke: '#FACC15',
    icon: '#854D0E',
    shadow: 'rgba(161, 98, 7, 0.2)',
  },
  SHOPPING: {
    fill: '#FBCFE8',
    stroke: '#F472B6',
    icon: '#9D174D',
    shadow: 'rgba(190, 24, 93, 0.2)',
  },
  ENTERTAINMENT: {
    fill: '#C7D2FE',
    stroke: '#818CF8',
    icon: '#3730A3',
    shadow: 'rgba(67, 56, 202, 0.2)',
  },
  GENERIC: {
    fill: '#E7E5E4',
    stroke: '#A8A29E',
    icon: '#44403C',
    shadow: 'rgba(68, 64, 60, 0.18)',
  },
};

const LOW_SIGNAL_PLACE_TYPES = new Set([
  'establishment',
  'locality',
  'neighborhood',
  'point_of_interest',
  'political',
  'premise',
  'route',
]);

function loadMarkerLibrary() {
  markerLibraryPromise ??= google.maps.importLibrary(
    'marker'
  ) as Promise<google.maps.MarkerLibrary>;

  return markerLibraryPromise;
}

function useMarkerLibrary() {
  return use(loadMarkerLibrary());
}

function createMarkerContent(category: LocationPlaceCategory) {
  const cachedContent = markerContentCache.get(category);

  if (cachedContent) {
    return cachedContent.cloneNode(true) as HTMLElement;
  }

  const markerContent = document.createElement('div');
  const palette = CATEGORY_MARKER_PALETTE[category];
  const iconKey = getLocationPlaceIconKey([], category);

  markerContent.style.position = 'relative';
  markerContent.style.width = '34px';
  markerContent.style.height = '42px';
  markerContent.style.transform = 'translateY(-6px)';
  markerContent.style.filter = `drop-shadow(0 8px 10px ${palette.shadow})`;
  markerContent.style.cursor = 'pointer';

  const pin = document.createElement('div');
  pin.style.alignItems = 'center';
  pin.style.background = palette.fill;
  pin.style.border = `2px solid ${palette.stroke}`;
  pin.style.borderRadius = '999px 999px 999px 8px';
  pin.style.boxSizing = 'border-box';
  pin.style.color = palette.icon;
  pin.style.display = 'flex';
  pin.style.height = '34px';
  pin.style.justifyContent = 'center';
  pin.style.left = '0';
  pin.style.position = 'absolute';
  pin.style.top = '0';
  pin.style.transform = 'rotate(-45deg)';
  pin.style.width = '34px';

  const iconWrap = document.createElement('div');
  iconWrap.style.alignItems = 'center';
  iconWrap.style.display = 'flex';
  iconWrap.style.height = '18px';
  iconWrap.style.justifyContent = 'center';
  iconWrap.style.transform = 'rotate(45deg)';
  iconWrap.style.width = '18px';
  iconWrap.innerHTML = `<svg aria-hidden="true" focusable="false" viewBox="0 0 15 15" width="16" height="16" fill="currentColor"><path d="${MAKI_ICON_PATHS[iconKey]}"></path></svg>`;

  pin.appendChild(iconWrap);
  markerContent.appendChild(pin);

  markerContentCache.set(category, markerContent);
  return markerContent.cloneNode(true) as HTMLElement;
}

function applyStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) {
  Object.assign(element.style, styles);
}

function buildGoogleMapsUrl({
  placeId,
  position,
  title,
}: {
  placeId?: string | null;
  position: google.maps.LatLngLiteral;
  title?: string;
}) {
  const params = new URLSearchParams({
    api: '1',
    query: title?.trim() || `${position.lat},${position.lng}`,
  });

  if (placeId) {
    params.set('query_place_id', placeId);
  }

  return `https://www.google.com/maps/search/?${params.toString()}`;
}

function formatPlaceTypeLabel(
  placeTypes: readonly string[],
  fallbackCategory: LocationPlaceCategory
) {
  const placeType = placeTypes.find(
    (type) => type.trim() && !LOW_SIGNAL_PLACE_TYPES.has(type)
  );

  if (!placeType) {
    return getPlaceCategoryLabel(fallbackCategory);
  }

  return placeType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createInfoRow(label: string, value: string, tone: 'warm' | 'cool') {
  const row = document.createElement('div');
  applyStyles(row, {
    alignItems: 'center',
    background: tone === 'warm' ? '#FFF7D6' : '#F2F5F4',
    border: `1px solid ${tone === 'warm' ? '#F6D96F' : '#D8DEDC'}`,
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '8px 10px',
  });

  const labelElement = document.createElement('span');
  labelElement.textContent = label;
  applyStyles(labelElement, {
    color: '#73716C',
    fontSize: '11px',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
  });

  const valueElement = document.createElement('span');
  valueElement.textContent = value;
  applyStyles(valueElement, {
    color: '#1F2421',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1.2',
    textAlign: 'right',
  });

  row.append(labelElement, valueElement);
  return row;
}

function createInfoWindowContent({
  appreciation,
  category,
  placeId,
  placeTypes,
  position,
  priceSentiment,
  title,
}: Required<Pick<GoogleMapAdvancedMarkerProps, 'category' | 'position'>> &
  Pick<
    GoogleMapAdvancedMarkerProps,
    'appreciation' | 'placeId' | 'placeTypes' | 'priceSentiment' | 'title'
  >) {
  const palette = CATEGORY_MARKER_PALETTE[category];
  const iconKey = getLocationPlaceIconKey(placeTypes ?? [], category);
  const placeTypeLabel = formatPlaceTypeLabel(placeTypes ?? [], category);

  const content = document.createElement('div');
  applyStyles(content, {
    color: '#1F2421',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    maxWidth: '260px',
    minWidth: '220px',
    padding: '2px',
  });

  const header = document.createElement('div');
  applyStyles(header, {
    alignItems: 'flex-start',
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  });

  const iconButton = document.createElement('button');
  iconButton.type = 'button';
  iconButton.setAttribute('aria-label', placeTypeLabel);
  iconButton.setAttribute('title', placeTypeLabel);
  applyStyles(iconButton, {
    alignItems: 'center',
    background: palette.fill,
    border: `1px solid ${palette.stroke}`,
    borderRadius: '8px',
    color: palette.icon,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: '0',
    height: '34px',
    justifyContent: 'center',
    padding: '0',
    position: 'relative',
    width: '34px',
  });
  iconButton.innerHTML = `<svg aria-hidden="true" focusable="false" viewBox="0 0 15 15" width="17" height="17" fill="currentColor"><path d="${MAKI_ICON_PATHS[iconKey]}"></path></svg>`;

  const tooltip = document.createElement('span');
  tooltip.textContent = placeTypeLabel;
  applyStyles(tooltip, {
    background: '#1F2421',
    borderRadius: '6px',
    bottom: 'calc(100% + 7px)',
    boxShadow: '0 8px 20px rgba(31, 36, 33, 0.2)',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '600',
    left: '50%',
    lineHeight: '1',
    opacity: '0',
    padding: '6px 8px',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateX(-50%)',
    transition: 'opacity 120ms ease',
    whiteSpace: 'nowrap',
    zIndex: '1',
  });
  iconButton.appendChild(tooltip);
  iconButton.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });
  iconButton.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
  iconButton.addEventListener('focus', () => {
    tooltip.style.opacity = '1';
  });
  iconButton.addEventListener('blur', () => {
    tooltip.style.opacity = '0';
  });

  const titleWrap = document.createElement('div');
  applyStyles(titleWrap, {
    minWidth: '0',
    paddingTop: '1px',
  });

  const titleElement = document.createElement('p');
  titleElement.textContent = title?.trim() || 'Untitled stop';
  applyStyles(titleElement, {
    color: '#181B19',
    fontSize: '15px',
    fontWeight: '800',
    lineHeight: '1.25',
    margin: '0',
    overflowWrap: 'anywhere',
  });

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Itinerary stop';
  applyStyles(subtitle, {
    color: '#73716C',
    fontSize: '11px',
    lineHeight: '1.25',
    margin: '3px 0 0',
  });

  titleWrap.append(titleElement, subtitle);
  header.append(iconButton, titleWrap);

  const details = document.createElement('div');
  applyStyles(details, {
    display: 'grid',
    gap: '8px',
    marginBottom: '12px',
  });

  details.append(
    createInfoRow(
      'Your rating',
      appreciation ? `★ ${appreciation}/5` : 'Not rated',
      'warm'
    ),
    createInfoRow(
      'Cost feel',
      priceSentiment ? getPriceSentimentLabel(priceSentiment) : 'Not set',
      'cool'
    )
  );

  const link = document.createElement('a');
  link.href = buildGoogleMapsUrl({ placeId, position, title });
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'See on Google Maps';
  applyStyles(link, {
    alignItems: 'center',
    background: '#1F2421',
    borderRadius: '8px',
    color: '#FFFFFF',
    display: 'flex',
    fontSize: '12px',
    fontWeight: '700',
    justifyContent: 'center',
    lineHeight: '1',
    padding: '10px 12px',
    textDecoration: 'none',
  });

  content.append(header, details, link);
  return content;
}

export function useAdvancedMarker({
  appreciation,
  map,
  position,
  placeId,
  placeTypes = EMPTY_PLACE_TYPES,
  priceSentiment,
  title,
  category = 'GENERIC',
}: GoogleMapAdvancedMarkerProps & { map: google.maps.Map }) {
  const markerLibrary = useMarkerLibrary();
  const { lat, lng } = position;
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const openInfoWindow = useEffectEvent(
    (
      marker: google.maps.marker.AdvancedMarkerElement,
      infoWindow: google.maps.InfoWindow
    ) => {
      const markerPosition = { lat, lng };

      marker.title = title ?? '';
      infoWindow.setOptions({ ariaLabel: title ?? null });
      activeInfoWindow?.close();
      infoWindow.setContent(
        createInfoWindowContent({
          appreciation,
          category,
          placeId,
          placeTypes,
          position: markerPosition,
          priceSentiment,
          title,
        })
      );
      infoWindow.open({
        anchor: marker,
        map,
      });
      activeInfoWindow = infoWindow;
    }
  );

  useEffect(() => {
    const marker = new markerLibrary.AdvancedMarkerElement({
      map,
      gmpClickable: true,
    });
    const infoWindow = new google.maps.InfoWindow({
      disableAutoPan: false,
    });
    markerRef.current = marker;
    infoWindowRef.current = infoWindow;

    const handleMarkerClick = () => {
      openInfoWindow(marker, infoWindow);
    };
    marker.addEventListener('gmp-click', handleMarkerClick);

    return () => {
      marker.removeEventListener('gmp-click', handleMarkerClick);
      if (activeInfoWindow === infoWindow) {
        activeInfoWindow = null;
      }
      if (markerRef.current === marker) {
        markerRef.current = null;
      }
      if (infoWindowRef.current === infoWindow) {
        infoWindowRef.current = null;
      }
      infoWindow.setContent(null);
      infoWindow.close();
      marker.content = null;
      marker.map = null;
    };
  }, [map, markerLibrary]);

  useEffect(() => {
    const marker = markerRef.current;

    if (marker) {
      marker.position = { lat, lng };
    }
  }, [lat, lng]);

  useEffect(() => {
    const marker = markerRef.current;

    if (marker) {
      marker.content = createMarkerContent(category);
    }
  }, [category]);

  useEffect(() => {
    const marker = markerRef.current;
    const titleLabel = title ?? '';

    if (marker) {
      marker.title = titleLabel;
    }

    infoWindowRef.current?.setOptions({
      ariaLabel: titleLabel || null,
    });
  }, [title]);
}

export default function GoogleMapAdvancedMarker(
  props: GoogleMapAdvancedMarkerProps
) {
  if (!props.map) {
    return null;
  }

  return <MemoizedGoogleMapAdvancedMarkerEffect {...props} map={props.map} />;
}

function GoogleMapAdvancedMarkerEffect(
  props: GoogleMapAdvancedMarkerProps & { map: google.maps.Map }
) {
  useAdvancedMarker(props);
  return null;
}

const MemoizedGoogleMapAdvancedMarkerEffect = memo(
  GoogleMapAdvancedMarkerEffect,
  areAdvancedMarkerPropsEqual
);

function areAdvancedMarkerPropsEqual(
  previous: GoogleMapAdvancedMarkerProps & { map: google.maps.Map },
  next: GoogleMapAdvancedMarkerProps & { map: google.maps.Map }
) {
  return (
    previous.map === next.map &&
    Object.is(previous.position.lat, next.position.lat) &&
    Object.is(previous.position.lng, next.position.lng) &&
    (previous.category ?? 'GENERIC') === (next.category ?? 'GENERIC') &&
    previous.title === next.title &&
    (previous.placeId ?? null) === (next.placeId ?? null) &&
    arePlaceTypesEqual(previous.placeTypes, next.placeTypes) &&
    (previous.appreciation ?? null) === (next.appreciation ?? null) &&
    (previous.priceSentiment ?? null) === (next.priceSentiment ?? null)
  );
}

function arePlaceTypesEqual(previous?: string[], next?: string[]) {
  const previousTypes = previous ?? EMPTY_PLACE_TYPES;
  const nextTypes = next ?? EMPTY_PLACE_TYPES;

  if (previousTypes === nextTypes) {
    return true;
  }

  if (previousTypes.length !== nextTypes.length) {
    return false;
  }

  return previousTypes.every(
    (placeType, index) => placeType === nextTypes[index]
  );
}
