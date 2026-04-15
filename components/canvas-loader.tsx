import { cn } from '@/lib/utils';

interface CanvasLoaderProps {
  className?: string;
  label?: string;
  spinnerClassName?: string;
}

export default function CanvasLoader({
  className,
  label = 'Loading',
  spinnerClassName,
}: CanvasLoaderProps) {
  return (
    <div
      className={cn('flex h-full items-center justify-center', className)}
      role="status"
    >
      <div
        className={cn(
          'border-primary h-12 w-12 animate-spin rounded-full border-b-2',
          spinnerClassName
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
