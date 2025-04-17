import { useShallow } from "zustand/react/shallow";

import useCharacterStore from "../store/characterStore";

const useCurrentPage = () => {
  return useCharacterStore(
    useShallow((state) => ({
      currentPage: state.currentPage,
      setCurrentPage: state.setCurrentPage,
      totalPages: state.totalPages,
    }))
  );
};
export default useCurrentPage;
