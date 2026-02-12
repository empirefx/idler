// A simple pub/sub event bus
export class EventBusService {
	constructor() {
		this.handlers = {};
	}

	// Subscribe to an event
	on(event, handler) {
		if (!this.handlers[event]) {
			this.handlers[event] = [];
		}
		this.handlers[event].push(handler);
	}

	// Unsubscribe from an event
	off(event, handler) {
		if (!this.handlers[event]) return;
		const index = this.handlers[event].indexOf(handler);
		if (index > -1) {
			this.handlers[event].splice(index, 1);
		}
	}

	// Emit an event
	emit(event, data) {
		if (!this.handlers[event]) return;
		this.handlers[event].forEach(handler => handler(data));
	}
}

// Create a singleton instance for global access
export const globalEventBus = new EventBusService();
