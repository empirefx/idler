import { useDispatch, useSelector } from "react-redux";
import {
	unequipItem,
	selectPlayerInventoryById,
} from "../../../store/slices/playerInventorySlice";
import ItemInfo from "../common/ItemInfo";

const EQUIPMENT_SLOTS = [
	{ key: "head", label: "Head" },
	{ key: "body", label: "Body" },
	{ key: "pants", label: "Pants" },
	{ key: "boots", label: "Boots" },
	{ key: "hands", label: "Hands" },
	{ key: "main-weapon", label: "Main Weapon" },
	{ key: "second-weapon", label: "Second Weapon" },
];

const EquipmentDisplay = () => {
	const dispatch = useDispatch();
	const playerInventory = useSelector((state) =>
		selectPlayerInventoryById(state, "player"),
	);
	const equipment = playerInventory?.equipment || {};

	const handleUnequip = (slot) => {
		if (equipment[slot]) {
			dispatch(unequipItem({ inventoryId: "player", slot }));
		}
	};

	return (
		<div className="equipment-flex">
			{EQUIPMENT_SLOTS.map(({ key, label }) => (
				<div
					role="button"
					tabIndex={equipment[key] ? 0 : -1}
					className={`${key} ${equipment[key] ? "equipped" : ""}`}
					key={key}
					onClick={() => equipment[key] && handleUnequip(key)}
					onKeyDown={(e) => {
						if ((e.key === "Enter" || e.key === " ") && equipment[key]) {
							handleUnequip(key);
						}
					}}
					style={{ cursor: equipment[key] ? "pointer" : "default" }}
				>
					{equipment[key] ? (
						<ItemInfo item={equipment[key]}>
							<div>
								{(equipment[key].type === "equipment" ||
									equipment[key].type === "head" ||
									equipment[key].type === "body" ||
									equipment[key].type === "pants" ||
									equipment[key].type === "boots" ||
									equipment[key].type === "hands" ||
									equipment[key].type === "shield" ||
									equipment[key].type === "accessory") && (
									<div
										className="armor-sprite"
										id={equipment[key].itemKey || equipment[key].id || "empty"}
									></div>
								)}
								<span>{equipment[key].name}</span>
							</div>
						</ItemInfo>
					) : (
						<span>{label}</span>
					)}
				</div>
			))}
		</div>
	);
};

export default EquipmentDisplay;
