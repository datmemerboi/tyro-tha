import { API_BASE_URL } from "../constants";
import { APIResponseSchema, APIResponse } from "../models/character";
import { validateResponse } from "../utils/validateResponse";

export async function fetchCharacterAPI(
  term?: string,
  species?: string,
  page?: number
) {
  const query = new URLSearchParams({
    name: term ? term : "",
    species: species ? species : "",
    page: page ? page.toString() : "1",
  });

  const url = new URL(`${API_BASE_URL}/?${query.toString()}`).toString();

  try {
    let res: Response = await fetch(url);
    const parsedData: APIResponse = await validateResponse(
      res,
      APIResponseSchema
    );
    if (!parsedData.results.length) {
      throw new Error("No characters found");
    }

    return parsedData;
  } catch (e) {
    console.error(e);
    // TODO: Determine error message & return it
    return null;
  }
}
