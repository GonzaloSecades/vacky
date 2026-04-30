import { table, t } from 'spacetimedb/server';

export const Location = table(
  {
    name: 'location',
    indexes: [
      {
        name: 'location_trip_id',
        accessor: 'location_trip_id',
        algorithm: 'btree',
        columns: ['tripId'],
      },
      {
        name: 'location_scheduled_date',
        accessor: 'location_scheduled_date',
        algorithm: 'btree',
        columns: ['scheduledDate'],
      },
    ],
  },
  {
    id: t.u64().primaryKey().autoInc(),
    tripId: t.u64(),
    locationTitle: t.string(),
    lat: t.f64(),
    lng: t.f64(),
    scheduledDate: t.string().optional(),
    order: t.i32(),
    placeId: t.string().optional(),
    placeTypesJson: t.string(),
    placeCategory: t.string().optional(),
    appreciation: t.i32().optional(),
    priceSentiment: t.string().optional(),
    notes: t.string().optional(),
    createdAt: t.timestamp(),
  }
);
