import { useEffect } from "react";
import useCharacterStore from "../store/characterStore";

const useCharacters = () => {
  const fetchMoreCharacters = useCharacterStore((s) => s.fetchMoreCharacters);

  useEffect(() => {
    fetchMoreCharacters();
  }, []);

  return useCharacterStore((s) => ({
    characters: s.characters,
    chosenCharacter: s.chosenCharacter,
    fetchMoreCharacters: () => s.fetchMoreCharacters(),
    chooseCharacter: s.chooseCharacter,
  }));
};

export default useCharacters;
