import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchBorderCountries,
  fetchCountries,
  fetchCountryByCode,
} from "./api";

describe("fetchCountries", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns validated countries", async () => {
    const controller = new AbortController();

    const data = {
      data: {
        objects: [
          {
            codes: {
              alpha_3: "DEU",
            },
            names: {
              common: "Germany",
              native: {
                deu: {
                  common: "Deutschland",
                },
              },
            },
            population: 80000000,
            region: "Germany",
            subregion: "Western Europe",
            capitals: [{ name: "Berlin" }],
            tlds: [".de"],
            currencies: [{ name: "Euro" }],
            languages: [{ name: "German", iso639_3: "deu" }],
            borders: ["AUT", "BEL"],
            flag: { url_svg: "https://flags.restcountries.com/v5/svg/de.svg" },
          },
        ],
      },
    };

    const response = new Response(JSON.stringify(data));

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(response);

    const countries = await fetchCountries(controller.signal);

    expect(countries.data.objects).toHaveLength(1);
    expect(countries).toEqual(data);
  });

  it("throws when the request fails", async () => {
    const controller = new AbortController();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 500 }),
    );

    await expect(fetchCountries(controller.signal)).rejects.toThrow();
  });

  it("throws when the response is invalid", async () => {
    const controller = new AbortController();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ invalid: true })),
    );

    await expect(fetchCountries(controller.signal)).rejects.toThrow();
  });
});

describe("fetchCountryByCode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches the country matching the provided code", async () => {
    const controller = new AbortController();

    const data = {
      data: {
        objects: [
          {
            codes: {
              alpha_3: "DEU",
            },
            names: {
              common: "Germany",
              native: {
                deu: {
                  common: "Deutschland",
                },
              },
            },
            population: 80000000,
            region: "Germany",
            subregion: "Western Europe",
            capitals: [{ name: "Berlin" }],
            tlds: [".de"],
            currencies: [{ name: "Euro" }],
            languages: [{ name: "German", iso639_3: "deu" }],
            borders: ["AUT", "BEL"],
            flag: { url_svg: "https://flags.restcountries.com/v5/svg/de.svg" },
          },
        ],
      },
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(data)));

    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchCountryByCode("DEU", controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/codes.alpha_3/DEU"),
      expect.objectContaining({ signal: controller.signal }),
    );

    expect(result).toEqual(data);
  });
});

describe("fetchBorderCountries", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches the border countries matching the provided code", async () => {
    const controller = new AbortController();

    const data = {
      data: {
        objects: [
          {
            codes: {
              alpha_3: "DEU",
            },
            names: {
              common: "Germany",
              native: {
                deu: {
                  common: "Deutschland",
                },
              },
            },
            population: 80000000,
            region: "Germany",
            subregion: "Western Europe",
            capitals: [{ name: "Berlin" }],
            tlds: [".de"],
            currencies: [{ name: "Euro" }],
            languages: [{ name: "German", iso639_3: "deu" }],
            borders: ["AUT", "BEL"],
            flag: { url_svg: "https://flags.restcountries.com/v5/svg/de.svg" },
          },
        ],
      },
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(data)));

    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchBorderCountries("AUT", controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/borders/AUT"),
      expect.objectContaining({ signal: controller.signal }),
    );

    expect(result).toEqual(data);
  });
});
