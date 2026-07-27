import DialogContent from "./DialogContent";
import useDialog from "./useDialog";

function TradeMessageDialog({ isOpen, message, type = "success", onClose }) {
	const { dialogRef, handleBackdropClick } = useDialog({ isOpen, onClose });

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
			<DialogContent
				className="trade-message-content"
				onClick={(e) => e.stopPropagation()}
			>
				<div className={`trade-message-icon ${type}`}>
					{type === "success" ? "✓" : "✗"}
				</div>
				<p className="trade-message-text">{message}</p>
				<button type="button" className="trade-message-btn" onClick={onClose}>
					OK
				</button>
			</DialogContent>
		</dialog>
	);
}

export default TradeMessageDialog;
