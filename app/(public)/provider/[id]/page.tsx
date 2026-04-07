import type { Metadata } from "next";
import { getProviderById } from "@/lib/queries/providers";
import { ProviderProfileView } from "./_components/ProviderProfileView";
import { notFound } from "next/navigation";

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) return {};

  const title = `${provider.name}, ${provider.credentials} — Homebirth Provider in ${provider.location}`;
  const description = provider.philosophy
    ? `${provider.philosophy.substring(0, 150)}${provider.philosophy.length > 150 ? "..." : ""}`
    : `${provider.name} is a ${provider.credentials} in ${provider.location}. View profile, reviews, and request a consult on Homebirth.com.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://homebirth.com/provider/${id}`,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://homebirth.com/provider/${id}`,
    },
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) notFound();
  return <ProviderProfileView provider={provider} />;
}
