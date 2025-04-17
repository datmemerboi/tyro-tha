import { Grid } from "@mantine/core";

import CharacterProfile from "./components/CharacterProfile";
import useCharacters from "./hooks/useCharacters";
import useChosenCharacters from "./hooks/useChosenCharacter";
import { filterBySpecies } from "./utils/filters";

function App() {
  const { characters, fetchMoreCharacters } = useCharacters();
  const { chooseCharacter } = useChosenCharacters();

  return (
    <>
      <Grid overflow="hidden">
        {/* LHS */}
        <Grid.Col span={4}>
          <h1>Rick & Morty characters</h1>
          <ul>
            {filterBySpecies(characters, "Human").map((c) => (
              <li
                key={c.id}
                data-id={c.id}
                role="character-list-item"
                onClick={() => chooseCharacter(c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>

          <button onClick={() => fetchMoreCharacters()}>Load more</button>
        </Grid.Col>
        {/* RHS */}
        <Grid.Col span={5} style={{ backgroundColor: "orange" }}>
          <CharacterProfile />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
