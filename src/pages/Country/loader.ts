import { fetchBorderCountries, fetchCountryByCode } from "@/api/countries/api";
import { transformRawCountry } from "@/api/countries/transform";
import type { LoaderFunctionArgs } from "react-router";

export async function countryLoader({
  params,
  request: { signal },
}: LoaderFunctionArgs) {
  const { countryCode } = params;

  if (countryCode == null) {
    throw new Response("Country code required", {
      status: 400,
    });
  }

  const countryData = await fetchCountryByCode(countryCode, signal);

  const borderCountryData = await fetchBorderCountries(countryCode, signal);

  const country = transformRawCountry(countryData, borderCountryData);

  return { countryPromise: country };
}
