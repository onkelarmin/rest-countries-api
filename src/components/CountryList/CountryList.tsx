import styles from "./CountryList.module.scss";
import { CountryCard } from "@/components/CountryCard/CountryCard";
import type { Country } from "@/types";

type CountryListProps = {
  countries: Country[];
};

export function CountryList({ countries }: CountryListProps) {
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <li key={country.isoCode3}>
          <CountryCard country={country} />
        </li>
      ))}
    </ul>
  );
}
