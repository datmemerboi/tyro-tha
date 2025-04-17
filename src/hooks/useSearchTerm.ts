import { useShallow } from "zustand/react/shallow";

import useCharacterStore from "../store/characterStore";

export default function useSearchTerm() {
  return useCharacterStore(
    useShallow((state) => ({
      searchResults: state.searchResults,
      searchByTerm: state.searchByTerm,
    }))
  );
}
