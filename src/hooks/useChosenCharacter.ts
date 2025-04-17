import { useShallow } from "zustand/react/shallow";
import useCharacterStore from "../store/characterStore";

const useChosenCharacters = () => {
  const { chosenCharacter, chooseCharacter } = useCharacterStore(
    useShallow((state) => ({
      chosenCharacter: state.chosenCharacter,
      chooseCharacter: state.chooseCharacter,
    }))
  );

  return { chosenCharacter, chooseCharacter };
};
export default useChosenCharacters;
