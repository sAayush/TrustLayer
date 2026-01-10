"use client";

import React, { useCallback } from "react";
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
import { Route } from "@/app/(protected)/talent/sidebarRoutes";
import * as Icons from "lucide-react";
import {createClient} from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SidebarClient({
  children,
  routes,
}: {
  children?: React.ReactNode;
  routes: Route[];
}) {
  const pathname = usePathname();
  const activePath = pathname ?? "/talent/dashboard";

  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={route.label}
                      isActive={isActive}
                      className="w-full"
                    >
                      <Link
                        href={route.href}
                        className="flex items-center gap-2"
                      >
                        {Icon && <Icon className="size-4" />}
                        <span className="font-medium">{route.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to site">
                  <Link href="/">
                    <Icons.ArrowLeft className="size-4" />
                    <span>Back to site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Log out"
                  onClick={() => {
                    handleLogout();
                  }}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icons.LogOut className="size-4" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 p-6">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
