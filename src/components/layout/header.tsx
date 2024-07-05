"use client";
import ThemeToggle from '~/components/layout/ThemeToggle/theme-toggle';
import { cn } from '~/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { signOut } from "next-auth/react"
import { toast } from 'sonner';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href="/"
          >
            <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acadium
          </div>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => {toast.message("Logged out"); signOut()}}>Logout</Button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}