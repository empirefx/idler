import { createContext, useContext, useState, useCallback } from "react";

const WindowManagerContext = createContext();

const BASE_Z_INDEX = 10;
const Z_INDEX_INCREMENT = 5;

export const WindowManagerProvider = ({ children }) => {
	const [windowStack, setWindowStack] = useState([]);
	const [windowPositions, setWindowPositions] = useState({});

	const bringToFront = useCallback((windowId) => {
		setWindowStack((prev) => {
			const exists = prev.includes(windowId);
			if (exists) return [...prev.filter((id) => id !== windowId), windowId];
			return [...prev, windowId];
		});
	}, []);

	const getFrontWindow = useCallback(() => {
		return windowStack[windowStack.length - 1] || null;
	}, [windowStack]);

	const getZIndex = useCallback(
		(windowId) => {
			const idx = windowStack.indexOf(windowId);
			return idx === -1 ? 0 : BASE_Z_INDEX + idx * Z_INDEX_INCREMENT;
		},
		[windowStack],
	);

	const isWindowAtFront = useCallback(
		(windowId) => getFrontWindow() === windowId,
		[getFrontWindow],
	);

	const getWindowPosition = useCallback(
		(windowId) => windowPositions[windowId] || null,
		[windowPositions],
	);

	const setWindowPosition = useCallback((windowId, position) => {
		setWindowPositions((prev) => ({ ...prev, [windowId]: position }));
	}, []);

	const removeFromStack = useCallback((windowId) => {
    setWindowStack((prev) => prev.filter((id) => id !== windowId));
	}, []);

	return (
		<WindowManagerContext.Provider
			value={{
				windowStack,
				bringToFront,
				removeFromStack,
				getFrontWindow,
				getZIndex,
				isWindowAtFront,
				getWindowPosition,
				setWindowPosition,
			}}
		>
			{children}
		</WindowManagerContext.Provider>
	);
};

export const useWindowManager = () => useContext(WindowManagerContext);
