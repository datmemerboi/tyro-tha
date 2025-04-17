import { Flex, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";

interface SearchBoxProps {
  label: string;
  onInput: (value: string) => any;
}

export default function SearchBox({ label, onInput }: SearchBoxProps) {
  const debouncedOnInput = useDebouncedCallback((event) => {
    const { value } = event.target;
    onInput(value);
  }, 300);

  return (
    <Flex w={"100%"}>
      <TextInput
        variant="filled"
        size="lg"
        radius="xl"
        label={label}
        placeholder="Enter the name you wish to search"
        onInput={debouncedOnInput}
      />
    </Flex>
  );
}
