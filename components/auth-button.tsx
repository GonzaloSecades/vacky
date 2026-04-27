'use client';

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
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
