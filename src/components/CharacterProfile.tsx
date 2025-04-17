import {
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";

import useChosenCharacters from "../hooks/useChosenCharacter";
import StatusBadge from "./StatusBadge";

export default function CharacterProfile() {
  const { chosenCharacter } = useChosenCharacters();

  if (!chosenCharacter) {
    return;
  }

  const createdDateStr = dayjs(chosenCharacter.created).format(
    "YYYY MMM DD HH:mm:ss"
  );

  return (
    <Card
      padding="xl"
      component="a"
      target="_blank"
      w={600}
      role="character-profile"
    >
      <Flex justify={"center"}>
        <Image
          src={chosenCharacter.image}
          w={"100%"}
          h={{ sm: "50%", md: "80%" }}
          radius={"lg"}
          alt={chosenCharacter.name}
        />
      </Flex>

      <Center>
        <Title order={1}>{chosenCharacter.name}</Title>
      </Center>
      <Group>
        <Flex dir="row" gap={12}>
          <StatusBadge type="status">{chosenCharacter.status}</StatusBadge>
          <StatusBadge type="species">{chosenCharacter.species}</StatusBadge>
        </Flex>
      </Group>

      <Group>
        <Grid justify="space-around" w={"100%"}>
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
        <Text>
          First noticed (in C-137 timeline): <code>{createdDateStr}</code>
        </Text>
      </Group>
    </Card>
  );
}
