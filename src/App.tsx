import { Container, Grid, Group, Pagination, Title } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

import CharacterProfile from "./components/CharacterProfile";
import SearchBox from "./components/SearchBox";
import useSearchTerm from "./hooks/useSearchTerm";
import useCurrentPage from "./hooks/useCurrentPage";
import CharacterList from "./components/CharacterList";

function App() {
  const { searchByTerm } = useSearchTerm();
  const { currentPage, setCurrentPage, totalPages } = useCurrentPage();

  const styles = useMantineTheme();

  return (
    <Container size={"80%"} py="md" px={{ md: "xs", lg: "md" }}>
      <Grid gutter="md">
        {/* LHS */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Group>
            <Title order={2} style={{ color: styles.colors.lime[4] }}>
              Rick & Morty characters
            </Title>
          </Group>

          <Group>
            <SearchBox
              label="Search"
              onInput={(value) => searchByTerm(value)}
            />
          </Group>

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
        <Grid.Col span={{ base: 12, md: 7 }}>
          <CharacterProfile />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default App;
