
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAuthRedirectPath } from "@/utils/auth-redirect";
import { logout } from "@/actions/auth";

export default async function talentDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    
    // We need user to display email, but getAuthRedirectPath handles redirect if no user.
    // However, we want to fetch user for rendering AFTER the check.
    
    const targetPath = await getAuthRedirectPath(supabase)
    
    if (targetPath !== '/talent/dashboard') {
        redirect(targetPath)
    }

    // Since getAuthRedirectPath would return '/login' if no user, we can assume user exists if strict, 
    // but TS might complain or we just re-fetch or use non-null assertion if safe.
    // However, `getAuthRedirectPath` doesn't return the user object.
    // So we assume if we are here, we are logged in.
    
    if (!user) {
        // Should have been redirected by above logic normally, but strictly:
        redirect("/login")
    }

    return (
        <div>
            <TypographyH1>Talent Dashboard</TypographyH1>
            <TypographyP>
                Welcome to your dashboard. Here you can manage your profile, view your applications, and more.
            </TypographyP>
            <TypographyP>You are logged in as {user.email}</TypographyP>
            <form action={logout}>
                <Button type="submit">
                    Sign Out
                </Button>
            </form>
        </div>
    )
}