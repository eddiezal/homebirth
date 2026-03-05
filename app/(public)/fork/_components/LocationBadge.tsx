import Link from "next/link";

const ZIP_TO_CITY: Record<string, string> = {
  // San Diego, CA
  "92101": "San Diego, CA", "92102": "San Diego, CA", "92103": "San Diego, CA",
  "92104": "San Diego, CA", "92105": "San Diego, CA", "92106": "San Diego, CA",
  "92107": "San Diego, CA", "92108": "San Diego, CA", "92109": "San Diego, CA",
  "92110": "San Diego, CA", "92111": "San Diego, CA", "92113": "San Diego, CA",
  "92114": "San Diego, CA", "92115": "San Diego, CA", "92116": "San Diego, CA",
  "92117": "San Diego, CA", "92118": "Coronado, CA",  "92119": "San Diego, CA",
  "92120": "San Diego, CA", "92121": "San Diego, CA", "92122": "San Diego, CA",
  "92123": "San Diego, CA", "92124": "San Diego, CA", "92126": "San Diego, CA",
  "92127": "San Diego, CA", "92128": "San Diego, CA", "92129": "San Diego, CA",
  "92130": "San Diego, CA", "92131": "San Diego, CA",
  "91910": "Chula Vista, CA", "91911": "Chula Vista, CA",
  "92008": "Carlsbad, CA",   "92009": "Carlsbad, CA",
  "92024": "Encinitas, CA",  "92014": "Del Mar, CA",
  "92075": "Solana Beach, CA","92064": "Poway, CA",
  "92071": "Santee, CA",     "92019": "El Cajon, CA", "92020": "El Cajon, CA",
  // Los Angeles, CA
  "90001": "Los Angeles, CA", "90002": "Los Angeles, CA", "90003": "Los Angeles, CA",
  "90004": "Los Angeles, CA", "90005": "Los Angeles, CA", "90006": "Los Angeles, CA",
  "90007": "Los Angeles, CA", "90008": "Los Angeles, CA", "90010": "Los Angeles, CA",
  "90011": "Los Angeles, CA", "90012": "Los Angeles, CA", "90013": "Los Angeles, CA",
  "90014": "Los Angeles, CA", "90015": "Los Angeles, CA", "90016": "Los Angeles, CA",
  "90017": "Los Angeles, CA", "90018": "Los Angeles, CA", "90019": "Los Angeles, CA",
  "90020": "Los Angeles, CA", "90021": "Los Angeles, CA", "90023": "Los Angeles, CA",
  "90024": "Los Angeles, CA", "90025": "Los Angeles, CA", "90026": "Los Angeles, CA",
  "90027": "Los Angeles, CA", "90028": "Los Angeles, CA", "90029": "Los Angeles, CA",
  "90031": "Los Angeles, CA", "90032": "Los Angeles, CA", "90033": "Los Angeles, CA",
  "90034": "Los Angeles, CA", "90035": "Los Angeles, CA", "90036": "Los Angeles, CA",
  "90037": "Los Angeles, CA", "90038": "Los Angeles, CA", "90039": "Los Angeles, CA",
  "90040": "Los Angeles, CA", "90041": "Los Angeles, CA", "90042": "Los Angeles, CA",
  "90043": "Los Angeles, CA", "90044": "Los Angeles, CA", "90045": "Los Angeles, CA",
  "90046": "Los Angeles, CA", "90047": "Los Angeles, CA", "90048": "Los Angeles, CA",
  "90049": "Los Angeles, CA", "90056": "Los Angeles, CA", "90057": "Los Angeles, CA",
  "90058": "Los Angeles, CA", "90059": "Los Angeles, CA", "90061": "Los Angeles, CA",
  "90062": "Los Angeles, CA", "90063": "Los Angeles, CA", "90064": "Los Angeles, CA",
  "90065": "Los Angeles, CA", "90066": "Los Angeles, CA", "90067": "Los Angeles, CA",
  "90068": "Los Angeles, CA", "90069": "West Hollywood, CA", "90071": "Los Angeles, CA",
  "90077": "Los Angeles, CA", "90089": "Los Angeles, CA", "90094": "Los Angeles, CA",
  "90210": "Beverly Hills, CA", "90211": "Beverly Hills, CA", "90212": "Beverly Hills, CA",
  "90230": "Culver City, CA", "90232": "Culver City, CA",
  "90245": "El Segundo, CA",
  "90272": "Pacific Palisades, CA",
  "90290": "Topanga, CA",
  "90291": "Venice, CA", "90292": "Marina del Rey, CA",
  "90293": "Playa del Rey, CA",
  "90401": "Santa Monica, CA", "90402": "Santa Monica, CA", "90403": "Santa Monica, CA",
  "90404": "Santa Monica, CA", "90405": "Santa Monica, CA",
  "91011": "La Canada, CA", "91030": "South Pasadena, CA",
  "91101": "Pasadena, CA", "91103": "Pasadena, CA", "91104": "Pasadena, CA",
  "91105": "Pasadena, CA", "91106": "Pasadena, CA", "91107": "Pasadena, CA",
  "91201": "Glendale, CA", "91202": "Glendale, CA", "91203": "Glendale, CA",
  "91204": "Glendale, CA", "91205": "Glendale, CA", "91206": "Glendale, CA",
  "91207": "Glendale, CA",
  "91301": "Agoura Hills, CA", "91302": "Calabasas, CA",
  "91344": "Granada Hills, CA", "91364": "Woodland Hills, CA",
  "91401": "Van Nuys, CA", "91402": "Panorama City, CA",
  "91403": "Sherman Oaks, CA", "91405": "Van Nuys, CA",
  "91423": "Sherman Oaks, CA", "91436": "Encino, CA",
  "91501": "Burbank, CA", "91502": "Burbank, CA", "91505": "Burbank, CA",
  "91601": "North Hollywood, CA", "91602": "North Hollywood, CA",
  "91604": "Studio City, CA", "91605": "North Hollywood, CA",
  "91606": "North Hollywood, CA", "91607": "Valley Village, CA",
  // Portland, OR
  "97201": "Portland, OR", "97202": "Portland, OR", "97203": "Portland, OR",
  "97204": "Portland, OR", "97205": "Portland, OR", "97206": "Portland, OR",
  "97207": "Portland, OR", "97208": "Portland, OR", "97209": "Portland, OR",
  "97210": "Portland, OR", "97211": "Portland, OR", "97212": "Portland, OR",
  "97213": "Portland, OR", "97214": "Portland, OR", "97215": "Portland, OR",
  "97216": "Portland, OR", "97217": "Portland, OR", "97218": "Portland, OR",
  "97219": "Portland, OR", "97220": "Portland, OR", "97221": "Portland, OR",
  "97222": "Milwaukie, OR", "97223": "Tigard, OR",
  "97224": "Tigard, OR",   "97225": "Portland, OR",
  "97227": "Portland, OR", "97229": "Portland, OR",
  "97230": "Portland, OR", "97231": "Portland, OR",
  "97232": "Portland, OR", "97233": "Portland, OR",
  "97236": "Portland, OR", "97239": "Portland, OR",
  "97266": "Portland, OR",
  // Austin, TX
  "78701": "Austin, TX", "78702": "Austin, TX", "78703": "Austin, TX",
  "78704": "Austin, TX", "78705": "Austin, TX", "78712": "Austin, TX",
  "78717": "Austin, TX", "78719": "Austin, TX", "78721": "Austin, TX",
  "78722": "Austin, TX", "78723": "Austin, TX", "78724": "Austin, TX",
  "78725": "Austin, TX", "78726": "Austin, TX", "78727": "Austin, TX",
  "78728": "Austin, TX", "78729": "Austin, TX", "78730": "Austin, TX",
  "78731": "Austin, TX", "78732": "Austin, TX", "78733": "Austin, TX",
  "78734": "Austin, TX", "78735": "Austin, TX", "78736": "Austin, TX",
  "78737": "Austin, TX", "78738": "Austin, TX", "78739": "Austin, TX",
  "78741": "Austin, TX", "78742": "Austin, TX", "78744": "Austin, TX",
  "78745": "Austin, TX", "78746": "Austin, TX", "78747": "Austin, TX",
  "78748": "Austin, TX", "78749": "Austin, TX", "78750": "Austin, TX",
  "78751": "Austin, TX", "78752": "Austin, TX", "78753": "Austin, TX",
  "78754": "Austin, TX", "78756": "Austin, TX", "78757": "Austin, TX",
  "78758": "Austin, TX", "78759": "Austin, TX",
  // Denver, CO
  "80201": "Denver, CO", "80202": "Denver, CO", "80203": "Denver, CO",
  "80204": "Denver, CO", "80205": "Denver, CO", "80206": "Denver, CO",
  "80207": "Denver, CO", "80208": "Denver, CO", "80209": "Denver, CO",
  "80210": "Denver, CO", "80211": "Denver, CO", "80212": "Denver, CO",
  "80214": "Denver, CO", "80215": "Denver, CO", "80216": "Denver, CO",
  "80218": "Denver, CO", "80219": "Denver, CO", "80220": "Denver, CO",
  "80221": "Denver, CO", "80222": "Denver, CO", "80223": "Denver, CO",
  "80224": "Denver, CO", "80226": "Denver, CO", "80227": "Denver, CO",
  "80228": "Denver, CO", "80229": "Denver, CO", "80230": "Denver, CO",
  "80231": "Denver, CO", "80232": "Denver, CO", "80233": "Denver, CO",
  "80234": "Denver, CO", "80235": "Denver, CO", "80236": "Denver, CO",
  "80237": "Denver, CO", "80238": "Denver, CO", "80239": "Denver, CO",
  "80240": "Denver, CO", "80241": "Denver, CO", "80243": "Denver, CO",
  "80246": "Denver, CO", "80247": "Denver, CO", "80249": "Denver, CO",
  "80264": "Denver, CO",
  // Seattle, WA
  "98101": "Seattle, WA", "98102": "Seattle, WA", "98103": "Seattle, WA",
  "98104": "Seattle, WA", "98105": "Seattle, WA", "98106": "Seattle, WA",
  "98107": "Seattle, WA", "98108": "Seattle, WA", "98109": "Seattle, WA",
  "98110": "Bainbridge Island, WA",
  "98112": "Seattle, WA", "98115": "Seattle, WA", "98116": "Seattle, WA",
  "98117": "Seattle, WA", "98118": "Seattle, WA", "98119": "Seattle, WA",
  "98121": "Seattle, WA", "98122": "Seattle, WA", "98125": "Seattle, WA",
  "98126": "Seattle, WA", "98133": "Seattle, WA", "98134": "Seattle, WA",
  "98136": "Seattle, WA", "98144": "Seattle, WA", "98146": "Burien, WA",
  "98155": "Seattle, WA", "98177": "Seattle, WA", "98178": "Seattle, WA",
  "98195": "Seattle, WA", "98199": "Seattle, WA",
  // New York, NY
  "10001": "New York, NY", "10002": "New York, NY", "10003": "New York, NY",
  "10004": "New York, NY", "10005": "New York, NY", "10006": "New York, NY",
  "10007": "New York, NY", "10009": "New York, NY", "10010": "New York, NY",
  "10011": "New York, NY", "10012": "New York, NY", "10013": "New York, NY",
  "10014": "New York, NY", "10016": "New York, NY", "10017": "New York, NY",
  "10018": "New York, NY", "10019": "New York, NY", "10020": "New York, NY",
  "10021": "New York, NY", "10022": "New York, NY", "10023": "New York, NY",
  "10024": "New York, NY", "10025": "New York, NY", "10026": "New York, NY",
  "10027": "New York, NY", "10028": "New York, NY", "10029": "New York, NY",
  "10030": "New York, NY", "10031": "New York, NY", "10032": "New York, NY",
  "10033": "New York, NY", "10034": "New York, NY", "10035": "New York, NY",
  "10036": "New York, NY", "10037": "New York, NY", "10038": "New York, NY",
  "10039": "New York, NY", "10040": "New York, NY",
  "10301": "Staten Island, NY", "10302": "Staten Island, NY",
  "10303": "Staten Island, NY", "10304": "Staten Island, NY",
  "10305": "Staten Island, NY", "10306": "Staten Island, NY",
  "10451": "Bronx, NY", "10452": "Bronx, NY", "10453": "Bronx, NY",
  "10454": "Bronx, NY", "10455": "Bronx, NY", "10456": "Bronx, NY",
  "10457": "Bronx, NY", "10458": "Bronx, NY", "10459": "Bronx, NY",
  "10460": "Bronx, NY", "10461": "Bronx, NY", "10462": "Bronx, NY",
  "10463": "Bronx, NY", "10464": "Bronx, NY", "10465": "Bronx, NY",
  "10466": "Bronx, NY", "10467": "Bronx, NY", "10468": "Bronx, NY",
  "10469": "Bronx, NY", "10470": "Bronx, NY", "10471": "Bronx, NY",
  "10472": "Bronx, NY", "10473": "Bronx, NY", "10474": "Bronx, NY",
  "10475": "Bronx, NY",
  "11201": "Brooklyn, NY", "11203": "Brooklyn, NY", "11204": "Brooklyn, NY",
  "11205": "Brooklyn, NY", "11206": "Brooklyn, NY", "11207": "Brooklyn, NY",
  "11208": "Brooklyn, NY", "11209": "Brooklyn, NY", "11210": "Brooklyn, NY",
  "11211": "Brooklyn, NY", "11212": "Brooklyn, NY", "11213": "Brooklyn, NY",
  "11214": "Brooklyn, NY", "11215": "Brooklyn, NY", "11216": "Brooklyn, NY",
  "11217": "Brooklyn, NY", "11218": "Brooklyn, NY", "11219": "Brooklyn, NY",
  "11220": "Brooklyn, NY", "11221": "Brooklyn, NY", "11222": "Brooklyn, NY",
  "11223": "Brooklyn, NY", "11224": "Brooklyn, NY", "11225": "Brooklyn, NY",
  "11226": "Brooklyn, NY", "11228": "Brooklyn, NY", "11229": "Brooklyn, NY",
  "11230": "Brooklyn, NY", "11231": "Brooklyn, NY", "11232": "Brooklyn, NY",
  "11233": "Brooklyn, NY", "11234": "Brooklyn, NY", "11235": "Brooklyn, NY",
  "11236": "Brooklyn, NY", "11237": "Brooklyn, NY", "11238": "Brooklyn, NY",
  "11239": "Brooklyn, NY",
  "11101": "Queens, NY", "11102": "Queens, NY", "11103": "Queens, NY",
  "11104": "Queens, NY", "11105": "Queens, NY", "11106": "Queens, NY",
  "11354": "Flushing, NY", "11355": "Flushing, NY", "11356": "College Point, NY",
  "11357": "Whitestone, NY", "11358": "Flushing, NY", "11360": "Bayside, NY",
  "11361": "Bayside, NY", "11362": "Little Neck, NY", "11363": "Little Neck, NY",
  "11364": "Oakland Gardens, NY", "11365": "Fresh Meadows, NY",
  "11366": "Fresh Meadows, NY", "11367": "Kew Gardens Hills, NY",
  "11368": "Corona, NY", "11369": "East Elmhurst, NY", "11370": "East Elmhurst, NY",
  "11371": "Flushing, NY", "11372": "Jackson Heights, NY",
  "11373": "Elmhurst, NY", "11374": "Rego Park, NY", "11375": "Forest Hills, NY",
  "11377": "Woodside, NY", "11378": "Maspeth, NY", "11379": "Middle Village, NY",
  "11385": "Ridgewood, NY", "11411": "Cambria Heights, NY",
  "11412": "Saint Albans, NY", "11413": "Springfield Gardens, NY",
  "11414": "Howard Beach, NY", "11415": "Kew Gardens, NY",
  "11416": "Ozone Park, NY", "11417": "Ozone Park, NY",
  "11418": "Richmond Hill, NY", "11419": "South Richmond Hill, NY",
  "11420": "South Ozone Park, NY", "11421": "Woodhaven, NY",
  "11422": "Rosedale, NY", "11423": "Hollis, NY",
  "11424": "Jamaica, NY", "11425": "Jamaica, NY", "11426": "Bellerose, NY",
  "11427": "Queens Village, NY", "11428": "Queens Village, NY",
  "11429": "Queens Village, NY", "11430": "Jamaica, NY",
  "11432": "Jamaica, NY", "11433": "Jamaica, NY",
  "11434": "Jamaica, NY", "11435": "Jamaica, NY", "11436": "Jamaica, NY",
};

export function resolveCity(zip: string): string | null {
  if (!zip || zip.length < 5) return null;
  return ZIP_TO_CITY[zip] || null;
}

interface LocationBadgeProps {
  zip: string;
}

export function LocationBadge({ zip }: LocationBadgeProps) {
  const city = resolveCity(zip);

  // No zip provided — don't render anything
  if (!zip) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      {city ?? `Near ${zip}`}
      <Link href="/#hero" className="ml-1 text-primary/70 hover:text-primary hover:underline">
        Change
      </Link>
    </div>
  );
}