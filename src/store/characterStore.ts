import { create } from "zustand";
import { Character } from "../models/character";
import { fetchCharacterAPI, fetchCharacterById } from "../api/characters";
import {
  API_NO_RECORDS,
  NETWORK_ERROR_MESSAGE,
  NO_SUCH_RECORDS_MESSAGE,
} from "../constants";

interface CharacterState {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  chosenCharacter?: Character | null;
  searchResults: Character[];
  errorMessage: string | null;

  setCurrentPage: (page: number) => Promise<void>;

  fetchMoreCharacters: (page?: number) => Promise<void>;
  chooseCharacter: (id: number) => void;
  searchByTerm: (term: string) => void;
  setErrorMessage: (msg: string) => void;
}

const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  currentPage: 1,
  totalPages: 1,
  chosenCharacter: null,
  searchResults: [],
  errorMessage: null,

  setCurrentPage: async (page: number) => {
    const { data, error } = await fetchCharacterAPI("", "Human", page); // Filter by species, skip to page

    if (error) {
      set({ errorMessage: error });
      return;
    }
    if (data === null) {
      // Error. Show pop-up message
      set({ errorMessage: NETWORK_ERROR_MESSAGE });
      return;
    }

    if (data?.results.length && data.results.length < 1) {
      // Empty result. Result accordingly
      set({ errorMessage: API_NO_RECORDS });
    }

    set(() => ({
      characters: data.results,
      currentPage: page,
    }));
  },

  fetchMoreCharacters: async (page = get().currentPage) => {
    const { data, error } = await fetchCharacterAPI("", "Human", page); // Filter by species, skip to page

    if (error) {
      set({ errorMessage: error });
      return;
    }
    if (data === null) {
      // Error. Show pop-up message
      set({ errorMessage: NETWORK_ERROR_MESSAGE });
      return;
    }

    if (data?.results.length && data.results.length < 1) {
      // Empty result. Result accordingly
      set({ errorMessage: API_NO_RECORDS });
      return;
    }

    set((state) => ({
      characters: [...state.characters, ...data.results],
      totalPages: data.info.pages,
    }));
  },
  chooseCharacter: async (id: number) => {
    const { data, error } = await fetchCharacterById(id, "Human");

    if (error) {
      set({ errorMessage: API_NO_RECORDS });
      return;
    }
    if (data === null) {
      if (data === null) {
        // Error. Show pop-up message
        set({ errorMessage: NETWORK_ERROR_MESSAGE });
        return;
      }
    }

    set({ chosenCharacter: data });
  },
  setErrorMessage: (msg: string) => set({ errorMessage: msg }),
  searchByTerm: async (term: string) => {
    if (!term || !term.length) {
      set({ searchResults: [], errorMessage: null });
      return;
    }

    const { data, error } = await fetchCharacterAPI(term, "Human");

    if (error) {
      set({ errorMessage: error });
      return;
    }
    if (data === null) {
      // Error. Show pop-up message
      set({ errorMessage: NETWORK_ERROR_MESSAGE });
      return;
    }

    if (data?.results.length && data.results.length < 1) {
      // Empty result. Result accordingly
      set({ errorMessage: NO_SUCH_RECORDS_MESSAGE });
    }

    set(() => ({ searchResults: data.results!, totalPages: data.info.pages }));
  },
}));

export default useCharacterStore;
