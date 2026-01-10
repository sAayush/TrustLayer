"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface PublicNavProps {
  user: User | null;
  dashboardUrl?: string;
}

export function PublicNav({ user, dashboardUrl = '/dashboard' }: PublicNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "For Developers", href: "/developers" },
    { name: "For Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              TrustLayer
            </span>
          </Link>
          
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive(item.href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <Link href={dashboardUrl} className="cursor-pointer">
               <Button className="cursor-pointer">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="cursor-pointer">
                <Button variant="ghost" className="cursor-pointer">Log in</Button>
              </Link>
              <Link href="/signup" className="cursor-pointer">
                <Button className="cursor-pointer">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu & Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation links</SheetDescription>
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="font-bold text-xl">
                  TrustLayer
                </Link>
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-foreground",
                        isActive(item.href)
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t" />
                  {user ? (
                     <Link href={dashboardUrl}>
                        <Button className="w-full cursor-pointer">Dashboard</Button>
                     </Link>
                  ) : (
                    <>
                      <Link href="/login" className="text-lg font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                        Log in
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full cursor-pointer">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
