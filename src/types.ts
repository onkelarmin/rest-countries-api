import type z from "zod";
import type { RawCountriesSchema } from "./schema";

export type RawCountries = z.infer<typeof RawCountriesSchema>;

export type Country = {
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
  borderCountries: string[];
  flagSvg: string;
};
