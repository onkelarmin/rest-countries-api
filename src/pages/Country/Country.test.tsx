import type { CountryExtended } from "@/api/countries/types";
import { describe, expect, it } from "vitest";
import { renderRoute } from "../../../test/router";
import { Country } from "./Country";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Country details page", () => {
  it("navigates to the correct border country details page when clicking its link", async () => {
    const user = userEvent.setup();

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
      initialEntries: ["/countries/DEU"],
    });

    expect(
      await screen.findByRole("heading", { name: germanyDetails.commonName }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", {
        name: `See details of ${austriaDetails.commonName}`,
      }),
    );

    expect(
      await screen.findByRole("heading", { name: austriaDetails.commonName }),
    ).toBeInTheDocument();
  });
});
