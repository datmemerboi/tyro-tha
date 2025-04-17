import React from "react";
import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { renderWithTheme } from ".";

import App from "../src/App";
import characterData from "../data/characters.json";

test("Expect list has first 2 characters", async () => {
  renderWithTheme(<App />);

  const c0 = characterData[0];
  const c1 = characterData[1];

  const listItemsArr = await screen.findAllByRole("character-list-item"); // Await fetch and render

  expect(listItemsArr.some((item) => item.innerHTML === c0.name)).toBe(true);
  expect(listItemsArr.some((item) => item.innerHTML === c1.name)).toBe(true);
});

test("Expect list item displays profile on click", async () => {
  renderWithTheme(<App />);
  const listItem = await screen.getAllByRole("character-list-item");
  await userEvent.click(listItem[0]);

  expect(await screen.findByRole("character-profile")).toBeVisible();
});
