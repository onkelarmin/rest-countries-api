import { RawCountriesSchema } from "@/schema";
import type { Country, RawCountries } from "@/types";

type homeLoaderProps = {
  request: Request;
};

const BASE_URL = "https://api.restcountries.com/countries/v5";

const RESPONSE_FIELDS = [
  "flag.url_svg",
  "codes.alpha_3",
  "names.native",
  "names.common",
  "population",
  "region",
  "subregion",
  "capitals",
  "tlds",
  "currencies",
  "languages",
  "borders",
];

export async function homeLoader({ request: { signal } }: homeLoaderProps) {
  const response = await fetch(
    `${BASE_URL}?limit=100&response_fields=${RESPONSE_FIELDS.join(",")}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();

  const result = RawCountriesSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid raw countries format");
  }

  const countries = transformRawCountries(result.data);

  return { countriesPromise: countries };
}

function transformRawCountries(rawData: RawCountries): Country[] {
  const rawCountryArray = rawData.data.objects;

  return rawCountryArray
    .filter(
      (country) =>
        country.region !== "Antarctic" && country.flag.url_svg !== "",
    )
    .map((country) => {
      const isoName = country.languages[0].iso639_3;

      return {
        isoCode3: country.codes.alpha_3,
        commonName: country.names.common,
        nativeName:
          country.names.native[isoName]?.common ?? "No native name found",
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        capitals: country.capitals.map((capital) => capital.name),
        topLevelDomains: country.tlds,
        currencies: country.currencies.map((currency) => currency.name),
        languages: country.languages.map((language) => language.name),
        borderCountries: country.borders,
        flagSvg: country.flag.url_svg,
      };
    });
}
