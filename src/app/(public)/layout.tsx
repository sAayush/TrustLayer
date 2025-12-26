import { PublicNav } from "@/components/nav/public-nav";
import { Footer } from "@/components/nav/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
