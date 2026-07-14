import styles from "./CountryList.module.scss";
import { CountryCard } from "@/components/CountryCard/CountryCard";
import type { CountryBase } from "@/api/countries/types";
import { NavLink } from "react-router";

type CountryListProps = {
  countries: CountryBase[];
};

export function CountryList({ countries }: CountryListProps) {
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <li key={country.isoCode3}>
          <NavLink
            to={`/countries/${country.isoCode3}`}
            className={styles.link}
          >
            <CountryCard country={country} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
