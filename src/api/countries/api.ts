import { RawCountriesSchema } from "./schema";
import type { RawCountries } from "./types";

const API_BASE_URL = "https://api.restcountries.com/countries/v5";

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

export async function fetchCountries(
  signal: AbortSignal,
): Promise<RawCountries> {
  const response = await fetch(
    `${API_BASE_URL}?limit=100&response_fields=${RESPONSE_FIELDS.join(",")}`,
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

  return result.data;
}

export async function fetchCountryByCode(
  code: string,
  signal: AbortSignal,
): Promise<RawCountries> {
  const response = await fetch(
    `${API_BASE_URL}/codes.alpha_3/${encodeURI(code)}?response_fields=${RESPONSE_FIELDS.join(",")}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch country: ${code}`);
  }

  const data = await response.json();

  const result = RawCountriesSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid raw country format");
  }

  return result.data;
}

export async function fetchBorderCountries(
  code: string,
  signal: AbortSignal,
): Promise<RawCountries> {
  const response = await fetch(
    `${API_BASE_URL}/borders/${encodeURI(code)}?response_fields=${RESPONSE_FIELDS.join(",")}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch border countries of ${code}`);
  }

  const data = await response.json();

  const result = RawCountriesSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid raw country format");
  }

  return result.data;
}
