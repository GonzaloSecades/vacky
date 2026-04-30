import { table, t } from 'spacetimedb/server';

export const Trip = table(
  { name: 'trip' },
  {
    id: t.u64().primaryKey().autoInc(),
    userId: t.u64().index('btree'),
    title: t.string(),
    description: t.string(),
    coverImageUrl: t.string().optional(),
    imagesJson: t.string(),
    startDate: t.timestamp(),
    endDate: t.timestamp(),
    createdAt: t.timestamp(),
    updatedAt: t.timestamp(),
  }
);
