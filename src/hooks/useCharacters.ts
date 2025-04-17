import { useEffect } from "react";
import useCharacterStore from "../store/characterStore";
import { useShallow } from "zustand/react/shallow";

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
