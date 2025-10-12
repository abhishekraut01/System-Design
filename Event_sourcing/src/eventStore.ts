import type { Event } from "./events.js";

export class EventStore {
    private events: Event[] = [];

    addEvent(event: Event) {
        this.events.push(event);
    }

    getEvents(accountId: string): Event[] {
        return this.events.filter(e => 'accountId' in e.data && e.data.accountId === accountId);
    }
}
