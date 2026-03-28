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
    const currentOffset = useRef({ x: 0, y: 0 }); // tracks live position during drag
    const hasInitialized = useRef(false);
    const windowRef = useRef(null);

    const zIndex = getZIndex(windowId);
    const atFront = isWindowAtFront(windowId);

    useEffect(() => {
        if (isOpen && !hasInitialized.current) {
            bringToFront(windowId);
            const saved = getWindowPosition(windowId);
            const offset = saved ?? {
                x: (window.innerWidth - width) / 2,
                y: (window.innerHeight - (height ?? minHeight ?? 560)) / 2,
            };
            setLocalOffset(offset);
            currentOffset.current = offset;
            hasInitialized.current = true;
        }
        if (!isOpen) {
            removeFromStack(windowId);
            hasInitialized.current = false;
        }
    }, [isOpen, windowId, bringToFront, getWindowPosition, removeFromStack, width, height, minHeight]);

    const handleMouseDown = useCallback(
        (e) => {
            if (e.target.closest(".draggable-window-close")) return;
            e.preventDefault();
            bringToFront(windowId);
            isDragging.current = true;
            dragStart.current = {
                x: e.clientX - currentOffset.current.x,
                y: e.clientY - currentOffset.current.y,
            };

            const handleMouseMove = (e) => {
                if (!isDragging.current) return;
                const newOffset = {
                    x: e.clientX - dragStart.current.x,
                    y: e.clientY - dragStart.current.y,
                };
                // Move the DOM node directly — zero React renders during drag
                currentOffset.current = newOffset;
                if (windowRef.current) {
                    windowRef.current.style.left = `${newOffset.x}px`;
                    windowRef.current.style.top = `${newOffset.y}px`;
                }
            };

            const handleMouseUp = () => {
                isDragging.current = false;
                setLocalOffset(currentOffset.current);
                setWindowPosition(windowId, currentOffset.current);
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        },
        [bringToFront, windowId, setWindowPosition],
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
        <div
            ref={windowRef}
            className="draggable-window"
            style={windowStyle}
            onClick={handleClick}
        >
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