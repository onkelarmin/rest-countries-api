import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router";
import type { homeLoader } from "./loader";
import { CountryList } from "@/components/CountryList/CountryList";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";
import { Controls } from "@/components/Controls/Controls";
import { CountryListSkeleton } from "@/components/CountryList/CountryListSkeleton";
import { site } from "@/config/site";

export function Home() {
  const { countriesPromise } = useLoaderData<typeof homeLoader>();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  return (
    <main>
      {/* Meta */}
      <title>{site.defaultTitle}</title>
      <meta name="description" content={site.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.origin} />
      <meta property="og:title" content={site.defaultTitle} />
      <meta property="og:description" content={site.description} />
      <meta property="og:image" content={`${site.origin}${site.image}`} />
      <meta property="og:image:alt" content={site.defaultTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={site.origin} />
      <meta property="twitter:title" content={site.defaultTitle} />
      <meta property="twitter:description" content={site.description} />
      <meta property="twitter:image" content={`${site.origin}${site.image}`} />
      <meta property="twitter:image:alt" content={site.defaultTitle} />

      <Wrapper>
        <h1 className="visually-hidden">Countries</h1>

        <Controls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
        />

        <Suspense fallback={<CountryListSkeleton />}>
          <Await resolve={countriesPromise}>
            {(countries) => {
              const visibleCountries = countries.filter((country) => {
                const matchesRegion =
                  filterRegion === "" || country.region === filterRegion;

                const matchesSearch = country.commonName
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase());

                return matchesRegion && matchesSearch;
              });

              return <CountryList countries={visibleCountries} />;
            }}
          </Await>
        </Suspense>
      </Wrapper>
    </main>
  );
}
