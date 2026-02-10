// A simple pub/sub event bus
export class EventBusService {
	constructor() {
		this.handlers = {};
	}
	on(event, handler) {
		if (!this.handlers[event]) {
			this.handlers[event] = [];
		}
		this.handlers[event].push(handler);
	}
	emit(event, data) {
		(this.handlers[event] || []).forEach((h) => {
			h(data);
		});
	}
}
