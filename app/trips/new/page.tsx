'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createTrip } from '@/lib/actions/create-trip';
import { UploadButton } from '@/lib/upload-thing';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useTransition } from 'react';

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className="mx-auto mt-10 max-w-lg">
      <Card>
        <CardHeader>New trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransition(async () => {
                if (imageUrl) {
                  formData.append('coverImageUrl', imageUrl);
                }
                await createTrip(formData);
              });
            }}
          >
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Patagonia"
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none'
                )}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Trip description"
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none'
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="start-date"
                  id="start-date"
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none'
                  )}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="end-date"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end-date"
                  id="end-date"
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none'
                  )}
                  required
                />
              </div>
            </div>
            <div>
              <label>Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="mb-4 max-h-48 w-full rounded-md object-cover"
                  width={300}
                  height={300}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    console.log('File uploaded to:', res[0].ufsUrl);
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log(`An error has ocurred : ${error}`);
                }}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
