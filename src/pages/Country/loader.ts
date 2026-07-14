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

  const countryPromise = (async () => {
    const countryData = await fetchCountryByCode(countryCode, signal);

    const borderCountryData =
      countryData.data.objects[0].borders.length > 0
        ? await fetchBorderCountries(countryCode, signal)
        : { data: { objects: [] } };

    return transformRawCountry(countryData, borderCountryData);
  })();

  return { countryPromise };
}
