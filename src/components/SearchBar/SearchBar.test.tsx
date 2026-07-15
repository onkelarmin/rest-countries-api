import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "../../../test/router";
import { Home } from "@/pages/Home/Home";
import { screen } from "@testing-library/react";
import type { CountryBase } from "@/api/countries/types";

describe("Search-bar", () => {
  it("filters out country names that don't match and shows full list again once cleared", async () => {
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
    const algeria: CountryBase = {
      isoCode3: "DZA",
      commonName: "Algeria",
      population: 47000000,
      region: "Africa",
      capitals: ["Algiers"],
      flagSvg: "algeria.svg",
    };

    const countries = [germany, austria, algeria];

    renderRoute({
      routes: [
        {
          path: "/",
          element: <Home />,
          loader: () => ({ countriesPromise: Promise.resolve(countries) }),
        },
      ],
    });

    const searchInput = await screen.findByRole("searchbox", {
      name: "Search for a country",
    });

    await user.type(searchInput, "ger");

    expect(
      screen.queryByRole("heading", { name: germany.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: algeria.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: austria.commonName }),
    ).not.toBeInTheDocument();

    await user.clear(searchInput);

    expect(
      screen.queryByRole("heading", { name: germany.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: algeria.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: austria.commonName }),
    ).toBeInTheDocument();
  });
});
