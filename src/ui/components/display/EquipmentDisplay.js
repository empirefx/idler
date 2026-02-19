import { useDispatch, useSelector } from "react-redux";
import {
	unequipItem,
	selectInventoryById,
} from "../../../store/slices/inventorySlice";
import ItemInfo from "../common/ItemInfo";

const EQUIPMENT_SLOTS_LABELS = [
	{ key: "head", label: "Head" },
	{ key: "body", label: "Body" },
	{ key: "pants", label: "Pants" },
	{ key: "boots", label: "Boots" },
	{ key: "hands", label: "Hands" },
	{ key: "main-weapon", label: "Main Weapon" },
	{ key: "second-weapon", label: "Secondary Weapon" },
];

const EquipmentDisplay = () => {
	const dispatch = useDispatch();
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);
	const equipment = playerInventory?.equipment || {};

	const handleUnequip = (slot) => {
		if (equipment[slot]) {
			dispatch(unequipItem({ inventoryId: "player", slot }));
		}
	};

	return (
		<div className="equipment-flex">
			{EQUIPMENT_SLOTS_LABELS.map(({ key, label }) => (
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
								<div
									className="item-sprite"
									id={equipment[key].itemKey || equipment[key].id}
								/>
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
