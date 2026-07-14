import styles from "./CountryList.module.scss";
import { CountryCardSkeleton } from "@/components/CountryCard/CountryCardSkeleton";

export function CountryListSkeleton() {
  return (
    <ul className={styles.countryList}>
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index}>
          <CountryCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
