import { describe, expect, it } from "vitest";
import { Home } from "./Home";
import { renderRoute } from "../../../test/router";
import { screen } from "@testing-library/react";
import { Country } from "../Country/Country";
import userEvent from "@testing-library/user-event";
import type { CountryBase, CountryExtended } from "@/api/countries/types";

describe("Home route", () => {
  it("renders the correct country data on the page", async () => {
    const germany: CountryBase = {
      isoCode3: "DEU",
      commonName: "Germany",
      population: 80000000,
      region: "Europe",
      capitals: ["Berlin"],
      flagSvg: "germany.svg",
    };
    const austria: CountryBase = {
      isoCode3: "AUT",
      commonName: "Austria",
      population: 9000000,
      region: "Europe",
      capitals: ["Vienna"],
      flagSvg: "austria.svg",
    };

    const countries = [germany, austria];

    renderRoute({
      routes: [
        {
          path: "/",
          element: <Home />,
          loader: () => ({ countriesPromise: Promise.resolve(countries) }),
        },
      ],
    });

    expect(
      await screen.findByRole("heading", { name: germany.commonName }),
    ).toBeInTheDocument();
    expect(await screen.findByText(germany.capitals[0])).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: austria.commonName }),
    ).toBeInTheDocument();
    expect(await screen.findByText(austria.capitals[0])).toBeInTheDocument();
  });

  it("navigates to the correct country details page when the country card is clicked", async () => {
    const user = userEvent.setup();

    const germany: CountryBase = {
      isoCode3: "DEU",
      commonName: "Germany",
      population: 80000000,
      region: "Europe",
      capitals: ["Berlin"],
      flagSvg: "germany.svg",
    };
    const austria: CountryBase = {
      isoCode3: "AUT",
      commonName: "Austria",
      population: 9000000,
      region: "Europe",
      capitals: ["Vienna"],
      flagSvg: "austria.svg",
    };

    const countries = [germany, austria];

    const germanyDetails: CountryExtended = {
      isoCode3: "DEU",
      nativeName: "Deutschland",
      commonName: "Germany",
      population: 80000000,
      region: "Europe",
      subRegion: "Western Europe",
      capitals: ["Berlin"],
      flagSvg: "germany.svg",
      topLevelDomains: [".de"],
      currencies: ["Euro"],
      languages: ["German"],
      borderCountries: [
        { isoCode3: "AUT", commonName: "Austria" },
        { isoCode3: "BEL", commonName: "Belgium" },
      ],
    };
    const austriaDetails: CountryExtended = {
      isoCode3: "AUT",
      nativeName: "Österreich",
      commonName: "Austria",
      population: 9000000,
      region: "Europe",
      subRegion: "Central Europe",
      capitals: ["Vienna"],
      flagSvg: "austria.svg",
      topLevelDomains: [".at"],
      currencies: ["Euro"],
      languages: ["German"],
      borderCountries: [{ isoCode3: "DEU", commonName: "Germany" }],
    };

    const countriesDetails = [germanyDetails, austriaDetails];

    renderRoute({
      routes: [
        {
          path: "/",
          element: <Home />,
          loader: () => ({ countriesPromise: Promise.resolve(countries) }),
        },
        {
          path: "/countries/:countryCode",
          element: <Country />,
          loader: ({ params }) => ({
            countryPromise: Promise.resolve(
              countriesDetails.find(
                (country) => country.isoCode3 === params.countryCode,
              ),
            ),
          }),
        },
      ],
    });

    await user.click(
      await screen.findByRole("link", {
        name: `See details of ${germany.commonName}`,
      }),
    );

    expect(
      await screen.findByText(germanyDetails.nativeName),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(germanyDetails.subRegion),
    ).toBeInTheDocument();
  });
});
