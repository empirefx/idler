export default class Logger {
  static debugLevel = 0; // Global debug level
  static lastMessages = {}; // Track repeated messages
  static repeatCounts = {}; // Count repeats

  static #handleRepeats(key) {
    // Check if this is a repeat message
    if (Logger.lastMessages[key] === key.split(":")[1]) {
      Logger.repeatCounts[key] = (Logger.repeatCounts[key] || 1) + 1;
      return true; // It's a repeat
    }

    // If previous message was repeated, show count
    if (Logger.repeatCounts[key] > 1) {
      console.log(
        `${Logger.lastMessages[key]} (repeated ${Logger.repeatCounts[key]} times)`,
      );
      Logger.repeatCounts[key] = 0;
    }

    return false; // Not a repeat
  }

  static log(message, level = 1, category = "default", ...extra) {
    if (level > Logger.debugLevel) return;

    const key = `${category}:${message}`;
    if (Logger.#handleRepeats(key)) return;

    // Log the message and any extra arguments
    if (extra.length > 0) {
      console.log(message, ...extra);
    } else {
      console.log(message);
    }
    Logger.lastMessages[key] = message;
  }

  static error(message, level = 1, category = "error", ...extra) {
    if (level > Logger.debugLevel) return;

    const key = `${category}:${message}`;
    if (Logger.#handleRepeats(key)) return;

    // Log the new message with any extra arguments
    if (extra.length > 0) {
      console.error(message, ...extra);
    } else {
      console.error(message);
    }
    Logger.lastMessages[key] = message;
  }

  static setLevel(level) {
    Logger.debugLevel = level;
  }
}
