import { describe, expect, it } from "vitest";
import { renderRoute } from "../../../test/router";
import userEvent from "@testing-library/user-event";
import { Home } from "@/pages/Home/Home";
import { screen } from "@testing-library/react";
import type { CountryBase } from "@/api/countries/types";

describe("Region filter", () => {
  it("only shows countries from the selected region and shows all countries once filter is cleared", async () => {
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

    const filterSelect = await screen.findByRole("combobox", {
      name: "Filter by Region",
    });

    await user.selectOptions(filterSelect, "Africa");

    expect(
      screen.queryByRole("heading", { name: germany.commonName }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: austria.commonName }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: algeria.commonName }),
    ).toBeInTheDocument();

    await user.selectOptions(filterSelect, "All regions");

    expect(
      screen.queryByRole("heading", { name: germany.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: austria.commonName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: algeria.commonName }),
    ).toBeInTheDocument();
  });
});
