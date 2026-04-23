'use client';

import { Button } from '@/components/ui/button';
import { createTrip } from '@/lib/actions/create-trip';
import { UploadButton } from '@/lib/upload-thing';
import { CalendarDays, ImagePlus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';

export default function NewTrip() {
  const [isPendingImageUpload, setIsPendingImageUpload] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="max-w-2xl space-y-4">
          <div className="travel-kicker">
            <Sparkles className="size-3.5" />
            New trip
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
            Start a trip with better rhythm from the first screen.
          </h1>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            Add the destination, set the dates, and give the trip a cover so it
            already feels like somewhere worth planning.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="travel-panel p-6 md:p-7">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-secondary p-3 text-primary">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Trip checklist
                </p>
                <p className="text-sm text-muted-foreground">
                  Keep it simple, then enrich it later in the itinerary.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="travel-soft-panel p-4">
                <p className="text-sm font-semibold text-foreground">
                  Give it a clear title
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Name the trip the way you want to recognize it later on the
                  dashboard.
                </p>
              </div>
              <div className="travel-soft-panel p-4">
                <p className="text-sm font-semibold text-foreground">
                  Add a short note
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep it concise. The description works best as a trip mood,
                  route, or purpose statement.
                </p>
              </div>
              <div className="travel-soft-panel p-4">
                <p className="text-sm font-semibold text-foreground">
                  Optional cover image
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  If you have one, upload it now. If not, the trip will still
                  get a styled destination placeholder.
                </p>
              </div>
            </div>
          </aside>

          <div className="travel-panel p-6 md:p-8">
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
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Patagonia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-foreground"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="A windswept route through glaciers, coffee stops, and long southern light."
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="start-date"
                      className="text-sm font-semibold text-foreground"
                    >
                      Start date
                    </label>
                    <input
                      type="date"
                      name="start-date"
                      id="start-date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="end-date"
                      className="text-sm font-semibold text-foreground"
                    >
                      End date
                    </label>
                    <input
                      type="date"
                      name="end-date"
                      id="end-date"
                      required
                    />
                  </div>
                </div>

                <div className="travel-soft-panel space-y-4 p-4 md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-secondary p-2.5 text-primary">
                      <ImagePlus className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Cover image
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Optional, but useful for a stronger trip card.
                      </p>
                    </div>
                  </div>

                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Trip Preview"
                      className="h-64 w-full rounded-[1.4rem] object-cover"
                      width={900}
                      height={540}
                    />
                  ) : (
                    <div className="flex h-48 items-end rounded-[1.4rem] bg-[linear-gradient(135deg,#ffe1da_0%,#fff1f0_48%,#eef4ff_100%)] p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">
                          Preview
                        </p>
                        <p className="mt-2 max-w-xs text-2xl font-semibold tracking-[-0.04em] text-foreground">
                          Your trip card can start with a warm visual anchor.
                        </p>
                      </div>
                    </div>
                  )}

                  <UploadButton
                    endpoint="imageUploader"
                    appearance={{
                      container: 'w-full',
                      button:
                        'h-11 w-full rounded-full border border-border bg-white text-foreground shadow-[0_10px_22px_rgba(31,31,31,0.06)] transition-all hover:-translate-y-px hover:bg-accent',
                      allowedContent: 'text-xs text-muted-foreground',
                    }}
                    content={{
                      button({ ready, isUploading }) {
                        if (isUploading) {
                          return 'Uploading image...';
                        }

                        return ready ? 'Choose an image' : 'Preparing uploader...';
                      },
                    }}
                    onUploadBegin={() => {
                      setIsPendingImageUpload(true);
                    }}
                    onClientUploadComplete={(res) => {
                      if (res && res[0].ufsUrl) {
                        setImageUrl(res[0].ufsUrl);
                        setIsPendingImageUpload(false);
                      }
                    }}
                    onUploadError={() => {
                      setIsPendingImageUpload(false);
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || isPendingImageUpload}
              >
                {isPending ? 'Creating trip...' : 'Create trip'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
