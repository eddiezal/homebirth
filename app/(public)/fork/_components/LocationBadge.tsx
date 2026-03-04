import Link from "next/link";

const ZIP_TO_CITY: Record<string, string> = {
  "92101": "San Diego, CA",
  "92102": "San Diego, CA",
  "92103": "San Diego, CA",
  "92104": "San Diego, CA",
  "92105": "San Diego, CA",
  "92106": "San Diego, CA",
  "92107": "San Diego, CA",
  "92108": "San Diego, CA",
  "92109": "San Diego, CA",
  "92110": "San Diego, CA",
  "92111": "San Diego, CA",
  "92113": "San Diego, CA",
  "92114": "San Diego, CA",
  "92115": "San Diego, CA",
  "92116": "San Diego, CA",
  "92117": "San Diego, CA",
  "92118": "Coronado, CA",
  "92119": "San Diego, CA",
  "92120": "San Diego, CA",
  "92121": "San Diego, CA",
  "92122": "San Diego, CA",
  "92123": "San Diego, CA",
  "92124": "San Diego, CA",
  "92126": "San Diego, CA",
  "92127": "San Diego, CA",
  "92128": "San Diego, CA",
  "92129": "San Diego, CA",
  "92130": "San Diego, CA",
  "92131": "San Diego, CA",
  "91910": "Chula Vista, CA",
  "91911": "Chula Vista, CA",
  "92008": "Carlsbad, CA",
  "92009": "Carlsbad, CA",
  "92024": "Encinitas, CA",
  "92014": "Del Mar, CA",
  "92075": "Solana Beach, CA",
  "92064": "Poway, CA",
  "92071": "Santee, CA",
  "92019": "El Cajon, CA",
  "92020": "El Cajon, CA",
};

export function resolveCity(zip: string): string {
  return ZIP_TO_CITY[zip] || `Zip ${zip}`;
}

interface LocationBadgeProps {
  zip: string;
}

export function LocationBadge({ zip }: LocationBadgeProps) {
  const city = resolveCity(zip);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary">
      <svg
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      {city}
      <Link href="/" className="ml-1 text-primary/70 hover:text-primary hover:underline">
        Change
      </Link>
    </div>
  );
}
