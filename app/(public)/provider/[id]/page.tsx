import { getProviderById } from "@/lib/data/mock-providers";
import { ProviderProfileView } from "./_components/ProviderProfileView";
import { notFound } from "next/navigation";

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();
  return <ProviderProfileView provider={provider} />;
}
