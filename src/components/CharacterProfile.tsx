import {
  Card,
  Chip,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";

import useChosenCharacters from "../hooks/useChosenCharacter";

export default function CharacterProfile() {
  const { chosenCharacter } = useChosenCharacters();

  if (!chosenCharacter) {
    return;
  }

  const createdDateStr = dayjs(chosenCharacter.created).format("YYYY MMM DD HH:mm:ss");

  return (
    <Card padding="xl" component="a" target="_blank" w={600} role="character-profile">
      <Card.Section>
        <Image
          src={chosenCharacter.image}
          w={520}
          h={520}
          alt={chosenCharacter.name}
        />
      </Card.Section>

      <Title order={1}>{chosenCharacter.name}</Title>
      <Chip size="lg">{chosenCharacter.status}</Chip>

      <Group>
        <Grid
          justify="space-around"
          w={"100%"}
          style={{ backgroundColor: "rebeccapurple", textOverflow: "ellipsis" }}
        >
          <Grid.Col span={2}>
            <Text>Origin</Text>
            <Text>{chosenCharacter.origin.name}</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text>(Last known) Location</Text>
            <Text>{chosenCharacter.location.name}</Text>
          </Grid.Col>
        </Grid>
      </Group>

      <Group>
        <Text>First noticed (in C-137 timeline): {createdDateStr}</Text>
      </Group>
    </Card>
  );
}
