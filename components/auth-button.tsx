'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface AuthButtonProps {
  isLoggedIn: boolean;
  className?: string;
  children?: ReactNode;
}

export default function AuthButton({
  isLoggedIn,
  className,
  children,
}: AuthButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (isLoggedIn) {
      router.push('/trips');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(buttonVariants({ size: 'lg' }), className)}
    >
      {children}
    </button>
  );
}
