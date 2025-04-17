import { Container, Grid, Group, Pagination, Title } from "@mantine/core";

import CharacterProfile from "./components/CharacterProfile";
import SearchBox from "./components/SearchBox";
import useSearchTerm from "./hooks/useSearchTerm";
import useCurrentPage from "./hooks/useCurrentPage";
import CharacterList from "./components/CharacterList";

function App() {
  const { searchByTerm } = useSearchTerm();
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
            <CharacterList />
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
