import { PublicNav } from "@/components/nav/public-nav";
import { Footer } from "@/components/nav/footer";
import { getCurrentUser } from "@/data/user";
import { getAuthRedirectPath } from "@/utils/auth-redirect";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const dashboardUrl = user ? await getAuthRedirectPath() : '/dashboard';

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav user={user} dashboardUrl={dashboardUrl} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
