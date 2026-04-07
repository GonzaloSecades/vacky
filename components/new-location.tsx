'use client';

import { addLocation } from '@/lib/actions/create-location';
import { useTransition } from 'react';
import { Button } from './ui/button';

export default function NewLocationClient({
  tripId,
  tripTitle,
}: {
  tripId: string;
  tripTitle: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-3 text-center text-3xl font-bold">New location</h1>
          <p className="mb-3 text-center text-sm text-gray-400 uppercase">
            {/* <Mountain className="mr-2 inline-block text-gray-300" /> */}
            {tripTitle}
          </p>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder:font-light placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Address"
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? 'Adding...' : 'Add location'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
