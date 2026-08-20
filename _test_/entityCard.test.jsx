// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EntityCard from "../src/ui/components/card/EntityCard";

const createStore = (targetEnemyId) =>
	configureStore({
		reducer: { player: (state = { id: "me", targetEnemyId: null }) => state },
		preloadedState: { player: { id: "me", targetEnemyId } },
	});

const renderCard = (enemy) => {
	const store = createStore("e1");
	return render(
		<Provider store={store}>
			<EntityCard entity={enemy} />
		</Provider>
	);
};

describe("EntityCard target highlight", () => {
	it("applies the targeted class to the locked, alive enemy", () => {
		const { container } = renderCard({ id: "e1", hp: 50, maxHp: 50, name: "Beast", avatar: "1" });
		expect(container.querySelector(".entity-card")).toHaveClass("targeted");
	});

	it("removes the targeted class from a dead locked enemy", () => {
		const { container } = renderCard({ id: "e1", hp: 0, maxHp: 50, name: "Beast", avatar: "1" });
		const card = container.querySelector(".entity-card");
		expect(card).toHaveClass("dead");
		expect(card).not.toHaveClass("targeted");
	});
});
