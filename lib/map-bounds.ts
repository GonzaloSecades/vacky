export interface MapBoundsPoint {
  lat: number;
  lng: number;
}

interface FitMapToPointsOptions {
  defaultCenter: google.maps.LatLngLiteral;
  defaultZoom: number;
  singlePointZoom: number;
}

export function fitMapToPoints(
  map: google.maps.Map,
  points: readonly MapBoundsPoint[],
  { defaultCenter, defaultZoom, singlePointZoom }: FitMapToPointsOptions
) {
  if (points.length === 0) {
    map.setCenter(defaultCenter);
    map.setZoom(defaultZoom);
    return;
  }

  if (points.length === 1) {
    map.setCenter({
      lat: points[0].lat,
      lng: points[0].lng,
    });
    map.setZoom(singlePointZoom);
    return;
  }

  const bounds = new google.maps.LatLngBounds();
  for (const point of points) {
    bounds.extend({ lat: point.lat, lng: point.lng });
  }
  map.fitBounds(bounds);
}

export function getMapFitSignature(points: readonly MapBoundsPoint[]) {
  return points.map((point) => `${point.lat}:${point.lng}`).join('|');
}

export function getMapCenterFromPoints(points: readonly MapBoundsPoint[]) {
  if (points.length === 0) {
    return null;
  }

  const coordinateTotals = points.reduce(
    (totals, point) => ({
      lat: totals.lat + point.lat,
      lng: totals.lng + point.lng,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: coordinateTotals.lat / points.length,
    lng: coordinateTotals.lng / points.length,
  };
}
