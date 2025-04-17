import { API_BASE_URL, API_NO_RECORDS, API_VALIDATION_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE } from "../constants";
import { APIResponseSchema, APIResponse } from "../models/character";
import {
  HTTPError,
  NotFoundError,
  validateResponse,
  ValidationError,
} from "../utils/validateResponse";

type FetchCharacterAPIResult =
  | { data: APIResponse; error: null }
  | { data: null; error: string };

export async function fetchCharacterAPI(
  term?: string,
  species?: string,
  page?: number
): Promise<FetchCharacterAPIResult> {
  const query = new URLSearchParams({
    name: term ? term : "",
    species: species ? species : "",
    page: page ? page.toString() : "1",
  });

  const url = new URL(`${API_BASE_URL}/?${query.toString()}`).toString();

  try {
    const res = await fetch(url);
    const parsedData = await validateResponse(res, APIResponseSchema);

    if (!parsedData.results.length) {
      return { data: null, error: "No characters found" };
    }

    return { data: parsedData, error: null };
  } catch (e) {
    if (e instanceof HTTPError) {
      return { data: null, error: NETWORK_ERROR_MESSAGE };
    }
    if (e instanceof NotFoundError) {
      return { data: null, error: API_NO_RECORDS };
    }
    if (e instanceof ValidationError) {
      return { data: null, error: API_VALIDATION_ERROR_MESSAGE };
    }

    return { data: null, error: "Unknown error occurred" };
  }
}
