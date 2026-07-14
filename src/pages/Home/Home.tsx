import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router";
import type { homeLoader } from "./loader";
import { CountryList } from "@/components/CountryList/CountryList";
import { Wrapper } from "@/components/utilities/Wrapper/Wrapper";
import { Controls } from "@/components/Controls/Controls";
import { CountryListSkeleton } from "@/components/CountryList/CountryListSkeleton";

export function Home() {
  const { countriesPromise } = useLoaderData<typeof homeLoader>();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  return (
    <main>
      <title>Countries | Explore the World</title>
      <meta
        name="description"
        content="Browse countries from around the world. Search by name, filter by region, and view detailed information about each country."
      />

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
