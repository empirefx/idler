export default class Logger {
    static debugLevel = 0; // Global debug level
    static lastMessages = {}; // Track repeated messages
    static repeatCounts = {}; // Count repeats
  
    static log(message, level = 1, category = 'default') {
      if (level > this.debugLevel) return;
      
      // Check if this is a repeat message
      const key = `${category}:${message}`;
      if (this.lastMessages[key] === message) {
        this.repeatCounts[key] = (this.repeatCounts[key] || 1) + 1;
        return; // Don't log repeats
      }
      
      // If previous message was repeated, show count
      if (this.repeatCounts[key] > 1) {
        console.log(`${this.lastMessages[key]} (repeated ${this.repeatCounts[key]} times)`);
        this.repeatCounts[key] = 0;
      }
      
      // Log the new message
      console.log(message);
      this.lastMessages[key] = message;
    }
    
    static setLevel(level) {
      this.debugLevel = level;
    }
  }
  