import { ProviderNav } from "@/components/ProviderNav";
import { Footer } from "@/components/Footer";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProviderNav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
