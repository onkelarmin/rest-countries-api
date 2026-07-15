import z from "zod";

export const RawCountriesSchema = z.object({
  data: z.object({
    objects: z
      .array(
        z.object({
          codes: z.object({ alpha_3: z.string() }),
          names: z.object({
            native: z.record(z.string(), z.object({ common: z.string() })),
            common: z.string(),
          }),
          population: z.number(),
          region: z.string(),
          subregion: z.string(),
          capitals: z.array(z.object({ name: z.string() })),
          tlds: z.array(z.string()),
          currencies: z.array(z.object({ name: z.string() })),
          languages: z.array(
            z.object({ name: z.string(), iso639_3: z.string() }),
          ),
          borders: z.array(z.string()),
          flag: z.object({ url_svg: z.string() }),
        }),
      )
      .nonempty(),
  }),
});
