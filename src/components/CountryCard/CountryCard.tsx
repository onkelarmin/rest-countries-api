import styles from "./CountryCard.module.scss";
import type { CountryBase } from "@/api/countries/types";
import { Heading } from "@/components/utilities/Heading/Heading";
import { formatList } from "@/utils/formatList";
import { formatNumber } from "@/utils/formatNumber";

type CountryCardProps = {
  country: CountryBase;
};

export function CountryCard({ country }: CountryCardProps) {
  const { flagSvg, commonName, population, region, capitals } = country;

  return (
    <article className={styles.card}>
      <img
        src={flagSvg}
        alt={`Flag of ${commonName}`}
        className={styles.flag}
      />
      <div className={styles.content}>
        <Heading tag="h2" size="h3">
          {commonName}
        </Heading>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Population:</dt>
            <dd>{formatNumber(population)}</dd>
          </div>

          <div className={styles.stat}>
            <dt>Region:</dt>
            <dd>{region}</dd>
          </div>

          <div className={styles.stat}>
            <dt>Capitals:</dt>
            <dd>{formatList(capitals)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
