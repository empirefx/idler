import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LOG_CATEGORIES = {
	worker: { label: "Workers", color: "worker" },
	combat: { label: "Combat", color: "combat" },
	movement: { label: "Movement", color: "movement" },
	default: { label: "Default", color: "default" },
};

export default function LogDisplay({ filteredLogs }) {
	const containerRef = useRef(null);

	// Scroll to bottom on update
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [filteredLogs]);

	return (
		<div className="log-display" ref={containerRef}>
			<div className="log-entries">
				{filteredLogs.map((l) => (
					<div
						key={l.id}
						className={`log-entry log-entry-${l.category || "default"}`}
					>
						<small>
							{new Date(l.ts).toLocaleTimeString(undefined, {
								hour: "2-digit",
								minute: "2-digit",
								hour12: false,
							})}
						</small>
						&nbsp;{l.message}
					</div>
				))}
			</div>
		</div>
	);
}
