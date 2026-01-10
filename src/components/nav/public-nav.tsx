"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useUserDetail } from "@/hooks/useProfile";

const navLinks = [
  { href: "/developers", label: "For Developers" },
  { href: "/companies", label: "For Companies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

// Shared User Navigation Dropdown (Desktop)
function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userDetails } = useUserDetail();
  const router = useRouter();
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashboardPath =
    userDetails?.role === "organization"
      ? "/organization/dashboard"
      : "/talent/dashboard";

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.refresh();
  }, [supabase, router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">Log in</Button>
        </Link>
        <Link href="/signup">
          <Button>Get Started</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center cursor-pointer overflow-hidden rounded-full border border-border bg-muted transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="User menu"
      >
        <UserIcon className="h-5 w-5 text-muted-foreground " />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md border bg-popover shadow-md animate-in fade-in-80 zoom-in-95 z-50">
          <div className="flex flex-col p-1">
            <Link
              href={dashboardPath}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10 "
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Auth Section (Reusable in Sheet)
function MobileAuthSection() {
  const { user, userDetails } = useUserDetail();
  const router = useRouter();
  const supabase = createClient();

  const dashboardPath =
    userDetails?.role === "organization"
      ? "/organization/dashboard"
      : "/talent/dashboard";

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.refresh();
  }, [supabase, router]);

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="text-lg font-medium text-muted-foreground hover:text-foreground"
        >
          Log in
        </Link>
        <Link href="/signup">
          <Button className="w-full">Get Started</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href={dashboardPath}
        className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground"
      >
        <LayoutDashboard className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        href="/profile"
        className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground"
      >
        <UserIcon className="h-5 w-5" />
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-2 text-left text-lg font-medium text-destructive hover:text-destructive/80"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </>
  );
}

export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold text-xl tracking-tight sm:inline-block">
              TrustLayer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <Link href={href} passHref legacyBehavior>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation and account links
              </SheetDescription>
              <div className="mt-6 flex flex-col gap-6">
                <Link href="/" className="font-bold text-xl">
                  TrustLayer
                </Link>
                <div className="flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground"
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="my-2 border-t" />
                  <MobileAuthSection />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}