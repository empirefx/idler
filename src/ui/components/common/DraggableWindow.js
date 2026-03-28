import { useState, useCallback, useEffect, useRef } from "react";
import { useWindowManager } from "../../WindowManagerContext";
import "../../../styles/components/draggable-window.css";

const DraggableWindow = ({
	windowId,
	title,
	width = 700,
	height,
	minHeight,
	backgroundImage,
	isOpen,
	onClose,
	children,
}) => {
	const {
		bringToFront,
		getZIndex,
		isWindowAtFront,
		getWindowPosition,
		setWindowPosition,
		removeFromStack,
	} = useWindowManager();

	const [localOffset, setLocalOffset] = useState(null);
	const isDragging = useRef(false);
	const dragStart = useRef({ x: 0, y: 0 });
	const hasInitialized = useRef(false);

	const zIndex = getZIndex(windowId);
	const atFront = isWindowAtFront(windowId);

	useEffect(() => {
		if (isOpen && !hasInitialized.current) {
			bringToFront(windowId);
			const saved = getWindowPosition(windowId);
			if (saved) {
				setLocalOffset(saved);
			} else {
				const winHeight = height ?? minHeight ?? 560;
				setLocalOffset({
					x: (window.innerWidth - width) / 2,
					y: (window.innerHeight - winHeight) / 2,
				});
			}
			hasInitialized.current = true;
		}
		if (!isOpen) {
			removeFromStack(windowId); // <-- remove when closed
			hasInitialized.current = false;
		}
	}, [
		isOpen,
		windowId,
		bringToFront,
		getWindowPosition,
		removeFromStack,
		width,
		height,
		minHeight,
	]);

	const handleMouseDown = useCallback(
		(e) => {
			if (e.target.closest(".draggable-window-close")) return;
			e.preventDefault();
			bringToFront(windowId);
			isDragging.current = true;
			dragStart.current = {
				x: e.clientX - localOffset.x,
				y: e.clientY - localOffset.y,
			};

			const handleMouseMove = (e) => {
				if (!isDragging.current) return;
				const newOffset = {
					x: e.clientX - dragStart.current.x,
					y: e.clientY - dragStart.current.y,
				};
				setLocalOffset(newOffset);
				setWindowPosition(windowId, newOffset);
			};

			const handleMouseUp = () => {
				isDragging.current = false;
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			};

			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		},
		[bringToFront, windowId, localOffset, setWindowPosition],
	);

	const handleClick = useCallback(() => {
		bringToFront(windowId);
	}, [bringToFront, windowId]);

	if (!isOpen || !localOffset) return null;

	const windowStyle = {
		width: `${width}px`,
		...(height && { height: `${height}px` }),
		...(minHeight && { minHeight: `${minHeight}px` }),
		zIndex,
		left: `${localOffset.x}px`,
		top: `${localOffset.y}px`,
		...(backgroundImage && { "--window-bg-image": `url(${backgroundImage})` }),
	};

	return (
		<div className="draggable-window" style={windowStyle} onClick={handleClick}>
			<div className="draggable-window-header" onMouseDown={handleMouseDown}>
				<h3 className="draggable-window-title">{title}</h3>
				<button
					className="draggable-window-close"
					onClick={onClose}
					disabled={!atFront}
				>
					×
				</button>
			</div>
			<div className="draggable-window-content">{children}</div>
		</div>
	);
};

export default DraggableWindow;
