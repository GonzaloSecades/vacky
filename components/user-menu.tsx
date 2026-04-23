'use client';

import { logout } from '@/lib/auth-actions';
import { cn } from '@/lib/utils';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MENU_OFFSET = 8;
const MENU_WIDTH = 224;
const VIEWPORT_PADDING = 16;

interface MenuPosition {
  left: number;
  top: number;
}

interface UserMenuProps {
  userEmail?: string | null;
  userImage?: string | null;
  userName?: string | null;
}

export default function UserMenu({
  userEmail,
  userImage,
  userName,
}: UserMenuProps) {
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const open = menuPosition !== null;

  const closeMenu = ({
    restoreFocus = false,
  }: { restoreFocus?: boolean } = {}) => {
    setMenuPosition(null);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const openMenu = () => {
    if (!triggerRef.current) {
      return;
    }

    const rect = triggerRef.current.getBoundingClientRect();
    const maxLeft = window.innerWidth - MENU_WIDTH - VIEWPORT_PADDING;
    const left = Math.min(
      Math.max(VIEWPORT_PADDING, rect.right - MENU_WIDTH),
      Math.max(VIEWPORT_PADDING, maxLeft)
    );

    setMenuPosition({
      left,
      top: rect.bottom + MENU_OFFSET,
    });
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        className="border-border/80 text-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring flex items-center gap-2 rounded-full border bg-white/88 p-1 shadow-[0_10px_22px_rgba(73,58,104,0.08)] transition-colors focus-visible:ring-2 focus-visible:outline-none"
        onClick={() => {
          if (open) {
            closeMenu();
            return;
          }

          openMenu();
        }}
      >
        <Image
          src={userImage || '/default-avatar.png'}
          alt="Open account menu"
          width={36}
          height={36}
          className="size-9 rounded-full object-cover"
        />
        <ChevronDown
          className={cn(
            'mr-2 size-4 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && menuPosition
        ? createPortal(
            <div
              className="fixed inset-0 z-[60]"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  closeMenu({ restoreFocus: true });
                }
              }}
            >
              <button
                type="button"
                aria-label="Close account menu"
                className="absolute inset-0 cursor-default"
                onClick={() => closeMenu()}
              />

              <div
                id={menuId}
                role="menu"
                className="border-border/80 bg-background/98 fixed z-[61] w-56 overflow-hidden rounded-[1.35rem] border shadow-[0_18px_42px_rgba(73,58,104,0.14)] backdrop-blur-xl"
                style={{ left: menuPosition.left, top: menuPosition.top }}
              >
                <div className="border-border border-b px-4 py-3">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {userName || 'Vacky account'}
                  </p>
                  {userEmail ? (
                    <p className="text-muted-foreground truncate text-sm">
                      {userEmail}
                    </p>
                  ) : null}
                </div>

                <div className="p-1">
                  <Link
                    href="/settings"
                    role="menuitem"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                    autoFocus
                    onClick={() => closeMenu()}
                  >
                    <Settings className="size-4" />
                    Settings
                  </Link>

                  <form action={logout} onSubmit={() => closeMenu()}>
                    <button
                      type="submit"
                      role="menuitem"
                      className="text-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
