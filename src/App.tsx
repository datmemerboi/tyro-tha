import { Container, Grid, Group } from "@mantine/core";

import CharacterProfile from "./components/CharacterProfile";
import useCharacters from "./hooks/useCharacters";
import useChosenCharacters from "./hooks/useChosenCharacter";
import { filterBySpecies } from "./utils/filters";
import SearchBox from "./components/SearchBox";
import useSearchTerm from "./hooks/useSearchTerm";

function App() {
  const { characters, fetchMoreCharacters } = useCharacters();
  const { chooseCharacter } = useChosenCharacters();
  const { searchResults, searchByTerm } = useSearchTerm();

  return (
    <Container size={"80%"}>
      <Grid overflow="hidden">
        {/* LHS */}
        <Grid.Col span={5}>
          <Group>
            <h1>Rick & Morty characters</h1>
          </Group>
          <Group>
            <SearchBox
              label="Search"
              onInput={(value) => searchByTerm(value)}
            />
          </Group>
          {/* SEARCH RESULTS */}
          <Group>
            {searchResults.length ? (
              <ul>
                {searchResults.map((r) => (
                  <li>{r.name}</li>
                ))}
              </ul>
            ) : null}
          </Group>
          <Group>
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
          </Group>

          <button onClick={() => fetchMoreCharacters()}>Load more</button>
        </Grid.Col>
        {/* RHS */}
        <Grid.Col span={6}>
          <CharacterProfile />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default App;
