import { create } from "zustand";
import { Character } from "../models/character";

interface CharacterState {
  characters: Character[];
  page: number;
  chosenCharacter?: Character | null;

  fetchMoreCharacters: (page?: number) => Promise<void>;
  chooseCharacter: (id: number) => void;
}

const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  page: 1,
  chosenCharacter: null,
  fetchMoreCharacters: async (page = get().page) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await res.json();
    set((state) => ({
      characters: [...state.characters, ...data.results],
      page: page + 1,
    }));
  },
  chooseCharacter: (id: number) => {
    const person = get().characters.find((p) => p.id === id) || null;
    set({ chosenCharacter: person });
  },
}));

export default useCharacterStore;
