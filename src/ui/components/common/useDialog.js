import { useCallback, useEffect, useRef } from "react";

const useDialog = ({ isOpen, onClose }) => {
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

	const handleBackdropClick = useCallback(
		(e) => {
			if (e.target === dialogRef.current && onClose) {
				onClose();
			}
		},
		[onClose],
	);

	return { dialogRef, handleBackdropClick };
};

export default useDialog;
