import { ParentNav } from "@/components/ParentNav";
import { Footer } from "@/components/Footer";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParentNav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
