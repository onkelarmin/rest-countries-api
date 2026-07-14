import { fetchCountries } from "@/api/countries/api";
import { transformRawCountries } from "@/api/countries/transform";
import type { LoaderFunctionArgs } from "react-router";

export function homeLoader({ request: { signal } }: LoaderFunctionArgs) {
  const countriesPromise = (async () => {
    const countryData = await fetchCountries(signal);

    return transformRawCountries(countryData);
  })();

  return { countriesPromise };
}
