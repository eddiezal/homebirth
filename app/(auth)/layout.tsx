import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
