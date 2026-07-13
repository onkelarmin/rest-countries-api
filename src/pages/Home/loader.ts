import { fetchCountries } from "@/api/countries/api";
import { transformRawCountries } from "@/api/countries/transform";
import type { LoaderFunctionArgs } from "react-router";

export async function homeLoader({ request: { signal } }: LoaderFunctionArgs) {
  const data = await fetchCountries(signal);

  const countries = transformRawCountries(data);

  return { countriesPromise: countries };
}
