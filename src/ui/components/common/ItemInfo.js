import { useState } from "react";

const ItemInfo = ({ item, children }) => {
	const [show, setShow] = useState(false);

	return (
		<div
			role="tooltip"
			className="item-info-wrapper"
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			{children}
			{show && (
				<div className="item-info-box">
					<p>
						<strong>{item.name}</strong>
					</p>
					<p>
						<em>"{item.description}"</em>
					</p>
					{item.type === "consumable" && (
						<p style={{ color: "green" }}>heal: {item.consumable?.heal}</p>
					)}
					<hr></hr>
					<p>weight: {item.weight}</p>
					{item.stats && (
						<div className="item-info-stats">
							{Object.entries(item.stats).map(([stat, value]) => (
								<p key={stat}>
									{stat}: +{value}
								</p>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ItemInfo;
