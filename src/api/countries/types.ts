import type z from "zod";
import type { RawCountriesSchema } from "./schema";

export type RawCountries = z.infer<typeof RawCountriesSchema>;

type BorderCountry = {
  isoCode3: string;
  commonName: string;
};

export type CountryBase = {
  isoCode3: string;
  commonName: string;
  population: number;
  region: string;
  capitals: string[];
  flagSvg: string;
};

export type CountryExtended = {
  isoCode3: string;
  commonName: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capitals: string[];
  topLevelDomains: string[];
  currencies: string[];
  languages: string[];
  borderCountries: BorderCountry[];
  flagSvg: string;
};
