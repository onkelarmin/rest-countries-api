import styles from "./Country.module.scss";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";
import { Suspense } from "react";
import { Await, NavLink, useLoaderData } from "react-router";
import type { countryLoader } from "./loader";
import { CountryDetails } from "@/components/CountryDetails/CountryDetails";
import BackIcon from "@/assets/svg/icon-back-arrow.svg?react";

export function Country() {
  const { countryPromise } = useLoaderData<typeof countryLoader>();

  console.log(countryPromise);

  return (
    <main>
      <Wrapper>
        <div className={styles.inner}>
          <NavLink to="/" className={styles.backLink}>
            <BackIcon className={styles.icon} aria-hidden="true" />
            <span>Back</span>
          </NavLink>

          <Suspense fallback="Loading">
            <Await resolve={countryPromise}>
              {(country) => <CountryDetails country={country} />}
            </Await>
          </Suspense>
        </div>
      </Wrapper>
    </main>
  );
}
