import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useCharacterStore from "../store/characterStore";

const useCharacters = () => {
  const { characters, fetchMoreCharacters } = useCharacterStore(
    useShallow((s) => ({
      characters: s.characters,
      fetchMoreCharacters: s.fetchMoreCharacters,
    }))
  );

  useEffect(() => {
    if (characters.length < 1) {
      fetchMoreCharacters();
    }
  }, []);

  return {
    characters,
    fetchMoreCharacters,
  };
};

export default useCharacters;
