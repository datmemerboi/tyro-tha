import { Container, Grid, Group, Pagination, Title } from "@mantine/core";

import CharacterProfile from "./components/CharacterProfile";
import useCharacters from "./hooks/useCharacters";
import useChosenCharacters from "./hooks/useChosenCharacter";
import SearchBox from "./components/SearchBox";
import useSearchTerm from "./hooks/useSearchTerm";
import useCurrentPage from "./hooks/useCurrentPage";

function App() {
  const { characters } = useCharacters();
  const { chooseCharacter } = useChosenCharacters();
  const { searchResults, searchByTerm } = useSearchTerm();
  const { currentPage, setCurrentPage, totalPages } = useCurrentPage();

  return (
    <Container size={"80%"}>
      <Grid overflow="hidden">
        {/* LHS */}
        <Grid.Col span={5}>
          <Group>
            <Title order={1}>Rick & Morty characters</Title>
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
              {characters.map((c) => (
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

          <Pagination
            total={totalPages ?? 100}
            value={currentPage}
            onChange={setCurrentPage}
          />
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
