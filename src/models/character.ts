import { z } from "zod";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  created: Date;
}

export const characterSchema: z.ZodType<Character> = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  created: z.date(),
});
