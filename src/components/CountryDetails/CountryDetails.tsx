import styles from "./CountryDetails.module.scss";
import type { CountryExtended } from "@/api/countries/types";
import { Heading } from "@/components/utilities/Heading/Heading";
import { formatList } from "@/utils/formatList";
import { formatNumber } from "@/utils/formatNumber";
import { NavLink } from "react-router";
import { Button } from "@/components/utilities/Button/Button";

type CountryDetailsProps = {
  country: CountryExtended;
};

export function CountryDetails({ country }: CountryDetailsProps) {
  const {
    flagSvg,
    commonName,
    nativeName,
    population,
    region,
    subRegion,
    capitals,
    topLevelDomains,
    currencies,
    languages,
    borderCountries,
  } = country;

  return (
    <section className={styles.inner} aria-labelledby="page-title">
      <img
        src={flagSvg}
        alt={`Flag of ${commonName}`}
        className={styles.image}
      />
      <div>
        <Heading tag="h1" size="h1" id="page-title">
          {commonName}
        </Heading>

        <div className={styles.lists}>
          <dl>
            <div className={styles.stat}>
              <dt>Native Name:</dt>
              <dd>{nativeName}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Population:</dt>
              <dd>{formatNumber(population)}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Region:</dt>
              <dd>{region}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Sub Region:</dt>
              <dd>{subRegion}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Capitals:</dt>
              <dd>{formatList(capitals)}</dd>
            </div>
          </dl>

          <dl>
            <div className={styles.stat}>
              <dt>Top Level Domain:</dt>
              <dd>{formatList(topLevelDomains)}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Currencies:</dt>
              <dd>{formatList(currencies)}</dd>
            </div>

            <div className={styles.stat}>
              <dt>Languages:</dt>
              <dd>{formatList(languages)}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.borders}>
          <Heading tag="h2" size="h4">
            Border Countries:
          </Heading>
          <ul>
            {borderCountries.map((bc) => (
              <li key={bc.isoCode3} className="list-style-none">
                <Button
                  As={NavLink}
                  variant="border"
                  to={`/countries/${bc.isoCode3}`}
                  aria-label={`See details of ${bc.commonName}`}
                >
                  {bc.commonName}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
