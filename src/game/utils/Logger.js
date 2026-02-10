// Global debug level
let debugLevel = 0;
// Track repeated messages
const lastMessages = {};
// Count repeats
const repeatCounts = {};

function handleRepeats(key) {
	// Check if this is a repeat message
	if (lastMessages[key] === key.split(":")[1]) {
		repeatCounts[key] = (repeatCounts[key] || 1) + 1;
		return true; // It's a repeat
	}

	// If previous message was repeated, show count
	if (repeatCounts[key] > 1) {
		console.log(`${lastMessages[key]} (repeated ${repeatCounts[key]} times)`);
		repeatCounts[key] = 0;
	}

	return false; // Not a repeat
}

function log(message, level = 1, category = "default", ...extra) {
	if (level > debugLevel) return;

	const key = `${category}:${message}`;
	if (handleRepeats(key)) return;

	// Log the message and any extra arguments
	if (extra.length > 0) {
		console.log(message, ...extra);
	} else {
		console.log(message);
	}
	lastMessages[key] = message;
}

function error(message, level = 1, category = "error", ...extra) {
	if (level > debugLevel) return;

	const key = `${category}:${message}`;
	if (handleRepeats(key)) return;

	// Log the new message with any extra arguments
	if (extra.length > 0) {
		console.error(message, ...extra);
	} else {
		console.error(message);
	}
	lastMessages[key] = message;
}

function setLevel(level) {
	debugLevel = level;
}

export default {
	log,
	error,
	setLevel,
};
