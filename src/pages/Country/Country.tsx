import styles from "./Country.module.scss";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";
import { Suspense } from "react";
import { Await, NavLink, useLoaderData, useParams } from "react-router";
import type { countryLoader } from "./loader";
import { CountryDetails } from "@/components/CountryDetails/CountryDetails";
import BackIcon from "@/assets/svg/icon-back-arrow.svg?react";
import { CountryDetailsSkeleton } from "@/components/CountryDetails/CountryDetailsSkeleton";
import { Button } from "@/components/utilities/Button/Button";
import { site } from "@/config/site";

export function Country() {
  const { countryPromise } = useLoaderData<typeof countryLoader>();

  const { countryCode } = useParams();

  return (
    <main>
      <Wrapper>
        <div className={styles.inner}>
          <Button As={NavLink} variant="back" to="/" viewTransition>
            <BackIcon className={styles.icon} aria-hidden="true" />
            <span>Back</span>
          </Button>

          <Suspense key={countryCode} fallback={<CountryDetailsSkeleton />}>
            <Await resolve={countryPromise}>
              {(country) => (
                <>
                  {/* Meta */}
                  <title>{`${country.commonName} | Countries`}</title>
                  <meta
                    name="description"
                    content={`Learn more about ${country.commonName}, including its population, capital, region, languages, currencies, and neighbouring countries.`}
                  />

                  <CountryDetails country={country} />
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </Wrapper>
    </main>
  );
}
