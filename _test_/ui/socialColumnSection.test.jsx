// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import SocialColumnSection from "../../src/ui/components/sections/SocialColumnSection.js";

vi.mock("../../src/ui/components/sections/NPCSection.js", () => ({
  default: () => <section data-testid="npc-section">NPC</section>,
}));
vi.mock("../../src/ui/components/sections/PlayersSection.js", () => ({
  default: () => <section data-testid="players-section">Players</section>,
}));

describe("SocialColumnSection", () => {
  it("wraps the social sections in a social-column", () => {
    const { container } = render(<SocialColumnSection />);
    const column = container.querySelector(".social-column");
    expect(column).toBeTruthy();
    expect(column.querySelector('[data-testid="npc-section"]')).toBeTruthy();
    expect(column.querySelector('[data-testid="players-section"]')).toBeTruthy();
  });
});
