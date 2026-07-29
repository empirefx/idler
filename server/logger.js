export const createServerLogger = ({ debug = false } = {}) => {
	const timestamp = () => new Date().toISOString();

	const log = (message, tag = "INFO") => {
		if (!debug && tag === "DEBUG") return;
		console.log(`[${timestamp()}] [${tag}] ${message}`);
	};

	const warn = (message) => {
		console.warn(`[${timestamp()}] [WARN] ${message}`);
	};

	const error = (message) => {
		console.error(`[${timestamp()}] [ERROR] ${message}`);
	};

	return { log, warn, error };
};
