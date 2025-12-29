"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Route } from "@/app/(protected)/talent/sidebarRoutes";
import * as Icons from "lucide-react";

export default function SidebarClient({
  children,
  routes,
}: {
  children?: React.ReactNode;
  routes: Route[];
}) {
  const pathname = usePathname();
  const activePath = pathname ?? "/talent/dashboard";

  return (
    <>
      <SidebarProvider defaultOpen>
        <Sidebar side="left" collapsible="offcanvas">
          <SidebarHeader>
            <div className="px-2 py-1 border-b border-border">
              <Link
                href="/talent/dashboard"
                className="flex items-center space-x-2"
              >
                <span className="hidden font-bold sm:inline-block text-2xl tracking-tight">
                  TrustLayer
                </span>
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {routes.map((route) => {
                const Icon = route.icon
                  ? (
                      Icons as unknown as Record<
                        string,
                        React.ComponentType<any>
                      >
                    )[route.icon]
                  : undefined;
                const isActive = activePath.startsWith(route.href);
                return (
                  <SidebarMenuItem key={route.href} data-active={isActive}>
                    <Link
                      href={route.href}
                      className={`w-full rounded-md p-2 flex items-center gap-2 hover:bg-accent-hover`}
                    >
                      <SidebarMenuButton asChild>
                        <a className={`flex items-center gap-2 w-full ${isActive ? "font-bold bg-accent" : ""}`}>
                          {Icon && <Icon className="size-10" />}
                          <span className={`text-base ${isActive ? "font-bold" : "font-medium"}`}>
                            {route.label}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-2">
              <Button asChild variant="ghost">
                <Link href="/">Back to site</Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 p-6">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
