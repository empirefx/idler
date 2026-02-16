import { useEffect, useRef } from "react";

function TradeMessageDialog({ isOpen, message, type = "success", onClose }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	const handleBackdropClick = (e) => {
		if (e.target === dialogRef.current) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<dialog
			ref={dialogRef}
			className={`trade-message-dialog ${type}`}
			onClick={handleBackdropClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
		>
			<div
				className="trade-message-content"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			>
				<div className={`trade-message-icon ${type}`}>
					{type === "success" ? "✓" : "✗"}
				</div>
				<p className="trade-message-text">{message}</p>
				<button
					type="button"
					className="trade-message-btn"
					onClick={onClose}
				>
					OK
				</button>
			</div>
		</dialog>
	);
}

export default TradeMessageDialog;
