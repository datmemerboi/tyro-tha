import {
  Card,
  Center,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import dayjs from "dayjs";

import useChosenCharacters from "../hooks/useChosenCharacter";
import StatusBadge from "./StatusBadge";

export default function CharacterProfile({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const styles = useMantineTheme();
  const { chosenCharacter } = useChosenCharacters();

  if (!chosenCharacter) {
    return;
  }

  const createdDateStr = dayjs(chosenCharacter.created).format(
    "YYYY MMM DD HH:mm:ss"
  );

  const renderMobileModal = () => {
    return (
      <>
        <Modal opened={isOpen} onClose={onClose} hiddenFrom="md">
          <Center>
            <Title order={3} style={{ color: styles.colors.lime[4] }}>
              {chosenCharacter.name}
            </Title>
          </Center>

          <Image
            src={chosenCharacter.image}
            w={"100%"}
            h={{ sm: "50%", md: "80%" }}
            radius={"lg"}
            alt={chosenCharacter.name}
          />

          <Group justify="center" w="100%" wrap="wrap" py={20}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Status
              </Text>
              <StatusBadge type="status">{chosenCharacter.status}</StatusBadge>
            </Stack>

            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Species
              </Text>
              <StatusBadge type="species">
                {chosenCharacter.species}
              </StatusBadge>
            </Stack>
          </Group>

          <Group justify="center" w="100%" wrap="wrap" py={20}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Origin
              </Text>
              <Text fw={500}>{chosenCharacter.origin.name}</Text>
            </Stack>

            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Last Known Location
              </Text>
              <Text fw={500}>{chosenCharacter.location.name}</Text>
            </Stack>
          </Group>

          <Group>
            <Text role="character-profile-created-date">
              First noticed (in C-137 timeline):{" "}
              <code style={{ color: styles.colors.gearGray[3] }}>
                {createdDateStr}
              </code>
            </Text>
          </Group>
        </Modal>
      </>
    );
  };

  const renderDesktopCard = () => {
    return (
      <Card
        padding="xl"
        w="100%"
        maw={600}
        role="character-profile"
        visibleFrom="md"
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
          <Title order={3} style={{ color: styles.colors.lime[4] }}>
            {chosenCharacter.name}
          </Title>
        </Center>

        <Group justify="center" w="100%" wrap="wrap" py={20}>
          <Paper p="md" radius="md" w="100%" maw={300}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Status
              </Text>
              <StatusBadge type="status">{chosenCharacter.status}</StatusBadge>
            </Stack>
          </Paper>

          <Paper p="md" radius="md" w="100%" maw={300}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Species
              </Text>
              <StatusBadge type="species">
                {chosenCharacter.species}
              </StatusBadge>
            </Stack>
          </Paper>
        </Group>

        <Group justify="center" w="100%" wrap="wrap" py={20}>
          <Paper p="md" radius="md" w="100%" maw={300}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Origin
              </Text>
              <Text fw={500}>{chosenCharacter.origin.name}</Text>
            </Stack>
          </Paper>

          <Paper p="md" radius="md" w="100%" maw={300}>
            <Stack gap={4} align="center">
              <Text size="sm" c="dimmed">
                Last Known Location
              </Text>
              <Text fw={500}>{chosenCharacter.location.name}</Text>
            </Stack>
          </Paper>
        </Group>

        <Group>
          <Text role="character-profile-created-date">
            First noticed (in C-137 timeline):{" "}
            <code style={{ color: styles.colors.gearGray[3] }}>
              {createdDateStr}
            </code>
          </Text>
        </Group>
      </Card>
    );
  };

  return (
    <>
      {renderMobileModal()}
      {renderDesktopCard()}
    </>
  );
}
