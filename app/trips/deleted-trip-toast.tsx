'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

interface DeletedTripToastProps {
  show: boolean;
}

export function DeletedTripToast({ show }: DeletedTripToastProps) {
  const router = useRouter();
  const hasShown = useRef(false);

  useEffect(() => {
    if (!show || hasShown.current) {
      return;
    }

    hasShown.current = true;
    toast.success('Trip successfully removed');
    router.replace('/trips', { scroll: false });
  }, [router, show]);

  return null;
}
