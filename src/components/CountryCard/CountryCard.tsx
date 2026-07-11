import styles from "./CountryCard.module.scss";
import type { Country } from "@/types";
import { Heading } from "@/components/utilities/Heading/Heading";
import { formatNumber } from "@/utils/formatNumber";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className={styles.card}>
      <img
        src={country.flagSvg}
        alt={`Flag of ${country.commonName}`}
        className={styles.flag}
      />
      <div className={styles.content}>
        <Heading tag="h2" size="h3">
          {country.commonName}
        </Heading>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Population:</dt>
            <dd>{formatNumber(country.population)}</dd>
          </div>

          <div className={styles.stat}>
            <dt>Region:</dt>
            <dd>{country.region}</dd>
          </div>

          <div className={styles.stat}>
            <dt>Capitals:</dt>
            <dd>{country.capitals}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
