import {
  Card,
  Center,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
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

      <Group justify="center" w="100%" wrap="nowrap" pt={20} pb={20}>
        <Paper p="md" radius="md" w={500}>
          <Stack gap={4} align="center">
            <Text size="sm" c="dimmed">
              Status
            </Text>
            <StatusBadge type="status">{chosenCharacter.status}</StatusBadge>
          </Stack>
        </Paper>

        <Paper p="md" radius="md" w={500}>
          <Stack gap={4} align="center">
            <Text size="sm" c="dimmed">
              Species
            </Text>
            <StatusBadge type="species">{chosenCharacter.species}</StatusBadge>
          </Stack>
        </Paper>
      </Group>

      <Group justify="center" w="100%" wrap="nowrap" pt={20} pb={20}>
        <Paper p="md" radius="md" w={500}>
          <Stack gap={4} align="center">
            <Text size="sm" c="dimmed">
              Origin
            </Text>
            <Text fw={500}>{chosenCharacter.origin.name}</Text>
          </Stack>
        </Paper>

        <Paper p="md" radius="md" w={500}>
          <Stack gap={4} align="center">
            <Text size="sm" c="dimmed">
              Last Known Location
            </Text>
            <Text fw={500}>{chosenCharacter.location.name}</Text>
          </Stack>
        </Paper>
      </Group>

      <Group>
        <Text>
          First noticed (in C-137 timeline): <code>{createdDateStr}</code>
        </Text>
      </Group>
    </Card>
  );
}
