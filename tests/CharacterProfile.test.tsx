import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import CharacterProfile from "../src/components/CharacterProfile";
import { renderWithTheme } from ".";

// Mock character data
const mockCharacter = {
  id: 1,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  created: "2017-11-05T05:50:21.651Z",
};

// Mock hook
vi.mock("../src/hooks/useChosenCharacter", () => ({
  default: () => ({
    chosenCharacter: mockCharacter,
  }),
}));

describe("CharacterProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders character name", () => {
    renderWithTheme(<CharacterProfile />);
    expect(
      screen.getByRole("heading", { name: /Morty Smith/i })
    ).toBeInTheDocument();
  });

  it("renders character image with correct alt text", () => {
    renderWithTheme(<CharacterProfile />);
    const img = screen.getByAltText(/Morty Smith/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockCharacter.image);
  });

  it("displays status and species badges", () => {
    renderWithTheme(<CharacterProfile />);
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
  });

  it("shows origin and last known location", () => {
    renderWithTheme(<CharacterProfile />);
    expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });

  it("displays created date in readable format", () => {
    renderWithTheme(<CharacterProfile />);
    const createdDate = screen.getByRole("character-profile-created-date");
    expect(createdDate).toBeInTheDocument();
    expect(createdDate.innerHTML).toBe("First noticed (in C-137 timeline): <code>2017 Nov 05 16:50:21</code>");
  });
});
