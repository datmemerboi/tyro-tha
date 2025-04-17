import { Character } from "../models/character";

export function filterBySpecies(
  listOfCharacters: Character[],
  speciesType: string
) {
  if (speciesType === "") {
    return listOfCharacters;
  }

  return listOfCharacters.filter((c) => c.species && c.species === speciesType);
}
