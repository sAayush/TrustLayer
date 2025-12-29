import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProfileById } from "@/data/profiles";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SidebarClient from "../../../components/Sidebar";
import talentSidebarRoutes from "./sidebarRoutes";

export default async function TalentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await getProfileById(supabase, user.id);

  // Client-only sidebar determines the active route using `usePathname`.
  // Keep server responsibilities (auth/profile) here and render the client sidebar below.

  if (!profile || profile.role !== "talent") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="space-y-2">
          <TypographyH1>Unauthorized Access</TypographyH1>
          <TypographyP>
            You do not have permission to view this area. This section is
            reserved for Talent accounts.
          </TypographyP>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="default">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <SidebarClient children={children} routes={talentSidebarRoutes} />
    </div>
  );
}
