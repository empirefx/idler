// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ItemInfo from "../../src/ui/components/common/ItemInfo.js";

describe("ItemInfo", () => {
	it("renders no stats box when the item has an empty stats object", () => {
		render(
			<ItemInfo
				item={{
					name: "Flour",
					description: "Fine flour",
					type: "material",
					weight: 0.5,
					stats: {},
				}}
			>
				<span>flour</span>
			</ItemInfo>
		);
		fireEvent.mouseEnter(screen.getByRole("tooltip"));
		expect(document.querySelector(".item-info-stats")).toBeNull();
	});

	it("renders the stats box when the item has stats", () => {
		render(
			<ItemInfo
				item={{
					name: "Helm",
					description: "A helm",
					type: "head",
					weight: 2,
					stats: { defense: 2 },
				}}
			>
				<span>helm</span>
			</ItemInfo>
		);
		fireEvent.mouseEnter(screen.getByRole("tooltip"));
		expect(document.querySelector(".item-info-stats")).toBeTruthy();
		expect(screen.getByText(/defense/)).toBeTruthy();
	});
});
