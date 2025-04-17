import React from "react";

import { screen, fireEvent, render } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";

import { renderWithTheme } from ".";
import characters from "../data/characters.json";

vi.mock("../hooks/useChosenCharacter", () => ({
  default: () => ({ chooseCharacter: vi.fn() }),
}));

beforeEach(() => {
  vi.resetModules(); // Reset to ensure clean mocking
});

describe("CharacterList", () => {
  it("renders characters from global store when no search results", async () => {
    vi.doMock("../hooks/useCharacters", () => ({
      default: () => ({ characters }),
    }));

    vi.doMock("../hooks/useSearchTerm", () => ({
      default: () => ({ searchResults: [] }),
    }));

    vi.doMock("../store/characterStore", () => ({
      default: (sel: any) => sel({ errorMessage: null }),
    }));
    const { default: CharacterList } = await import('../src/components/CharacterList');
    renderWithTheme(<CharacterList />);
    await screen.findAllByRole("character-list-item");

    const items = screen.getAllByRole("character-list-item");
    expect(items[0]).toHaveTextContent(characters[0].name);
  });

  it("renders error message if error exists", async () => {
    vi.doMock("../hooks/useCharacters", () => ({
      default: () => ({ characters: [] }),
    }));

    vi.doMock("../hooks/useSearchTerm", () => ({
      default: () => ({ searchResults: [] }),
    }));

    vi.doMock("../store/characterStore", () => ({
      default: (sel: any) => sel({ errorMessage: "API failed" }),
    }));

    const { default: CharacterList } = await import(
      "../src/components/CharacterList"
    );
    renderWithTheme(<CharacterList />);

    expect(screen.getByText("API failed")).toBeInTheDocument();
  });

  it("renders searchResults when present", async () => {
    vi.resetModules();

    const searchResults = [{ id: 100, name: "Morty Smith" }];

    vi.doMock("../hooks/useCharacters", () => ({
      default: () => ({ characters: [] }), // Prevent fallback render
    }));

    vi.doMock("../hooks/useSearchTerm", () => ({
      default: () => ({ searchResults }),
    }));

    vi.doMock("../hooks/useChosenCharacter", () => ({
      default: () => ({ chooseCharacter: vi.fn() }),
    }));

    vi.doMock("../store/characterStore", () => ({
      default: (sel: any) => sel({ errorMessage: null }),
    }));

    const { default: CharacterList } = await import(
      "../src/components/CharacterList"
    );
    renderWithTheme(<CharacterList />);
    await screen.findAllByRole("character-list-item");

    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });
});
