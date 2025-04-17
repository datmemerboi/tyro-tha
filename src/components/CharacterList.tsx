import { Stack, Text, Title, useMantineTheme } from "@mantine/core";

import { Character } from "../models/character";
import useCharacters from "../hooks/useCharacters";
import useChosenCharacters from "../hooks/useChosenCharacter";
import useSearchTerm from "../hooks/useSearchTerm";
import useCharacterStore from "../store/characterStore";

export default function CharacterList() {
  const { characters } = useCharacters();
  const { chooseCharacter } = useChosenCharacters();
  const { searchResults } = useSearchTerm();
  const style = useMantineTheme();

  const errorMessage = useCharacterStore((state) => state.errorMessage);

  const renderErrorMessage = () => {
    return (
      <Title size={"lg"} style={{ color: style.colors.portalGreen[5] }}>
        {errorMessage}
      </Title>
    );
  };

  const renderListItem = (char: Character) => (
    <Text
      td="underline"
      size="md"
      key={char.id}
      role="character-list-item"
      onClick={() => chooseCharacter(char.id)}
      c={style.colors.toxicPurple[2]}
    >
      {char.name}
    </Text>
  );

  let items;

  if (errorMessage) {
    return (
      <Stack w={"100%"} justify="center" m={"4%"}>
        {renderErrorMessage()}
      </Stack>
    );
  }

  if (searchResults.length > 0) {
    // Search results display.
    items = searchResults.map(renderListItem);
  } else {
    // All characters display.
    items = characters.map(renderListItem);
  }

  return (
    <Stack w={"100%"} justify="center" m={"4%"}>
      {items}
    </Stack>
  );
}
