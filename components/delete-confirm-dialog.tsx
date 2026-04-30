'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useId, useRef, type SyntheticEvent } from 'react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteConfirmDialogProps) {
  const descriptionId = useId();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }

      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    if (open) {
      onOpenChange(false);
    }
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (isDeleting) {
      event.preventDefault();
      return;
    }

    onOpenChange(false);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="backdrop:bg-black/50 fixed inset-0 m-auto w-full max-w-md rounded-lg border bg-background p-0 text-left shadow-lg"
      onCancel={handleCancel}
      onClose={handleClose}
    >
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold">
          Delete Trip
        </h2>
        <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
          You are about to permanently delete this trip and all of its saved
          locations.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            autoFocus
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            type="button"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
