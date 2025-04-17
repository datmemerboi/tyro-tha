import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../src/App";

test("Expect page title to be present", async () => {
  render(<App />);
  expect(screen.queryByText("Vite + React")).toBeInTheDocument();
  expect(
    screen.queryByText("Click on the Vite and React logos to learn more")
  ).toBeVisible();
});
