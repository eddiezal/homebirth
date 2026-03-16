import { getProviderById } from "@/lib/queries/providers";
import { ProviderProfileView } from "./_components/ProviderProfileView";
import { notFound } from "next/navigation";

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) notFound();
  return <ProviderProfileView provider={provider} />;
}
