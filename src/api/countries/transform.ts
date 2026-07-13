import type { CountryBase, CountryExtended, RawCountries } from "./types";

export function transformRawCountries(rawData: RawCountries): CountryBase[] {
  const rawCountryArray = rawData.data.objects;

  return rawCountryArray
    .filter(
      (country) =>
        country.region !== "Antarctic" && country.flag.url_svg !== "",
    )
    .map((country) => {
      return {
        isoCode3: country.codes.alpha_3,
        commonName: country.names.common,
        population: country.population,
        region: country.region,
        capitals: country.capitals.map((capital) => capital.name),
        flagSvg: country.flag.url_svg,
      };
    });
}

export function transformRawCountry(
  rawCountryData: RawCountries,
  rawBorderData: RawCountries,
): CountryExtended {
  const rawCountry = rawCountryData.data.objects[0];
  const isoName = rawCountry.languages[0].iso639_3;

  const borderCountries = rawBorderData.data.objects.map((bc) => ({
    isoCode3: bc.codes.alpha_3,
    commonName: bc.names.common,
  }));

  return {
    isoCode3: rawCountry.codes.alpha_3,
    commonName: rawCountry.names.common,
    nativeName:
      rawCountry.names.native[isoName]?.common ?? "No native name found",
    population: rawCountry.population,
    region: rawCountry.region,
    subRegion: rawCountry.subregion,
    capitals: rawCountry.capitals.map((capital) => capital.name),
    topLevelDomains: rawCountry.tlds,
    currencies: rawCountry.currencies.map((currency) => currency.name),
    languages: rawCountry.languages.map((language) => language.name),
    borderCountries: borderCountries,
    flagSvg: rawCountry.flag.url_svg,
  };
}
