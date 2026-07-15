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
      {countries.length === 0 ? (
        <EmptyCountryListStatus />
      ) : (
        countries.map((country) => (
          <li key={country.isoCode3}>
            <NavLink
              to={`/countries/${country.isoCode3}`}
              viewTransition
              className={styles.link}
              aria-label={`See details of ${country.commonName}`}
            >
              <CountryCard country={country} />
            </NavLink>
          </li>
        ))
      )}
    </ul>
  );
}

function EmptyCountryListStatus() {
  return (
    <div role="status">
      No countries found. Try adjusting your search or selected region.
    </div>
  );
}
