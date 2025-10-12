import { EventStore } from "./eventStore.js";
import type { Event } from "./events.js";

export class BankAccount {
  private balance = 0;
  private accountId: string;

  constructor(accountId: string, private store: EventStore) {
    this.accountId = accountId;
    this.replayEvents();
  }

  private replayEvents() {
    const events = this.store.getEvents(this.accountId);
    for (const event of events) {
      this.apply(event);
    }
  }

  private apply(event: Event) {
    switch (event.type) {
      case "AccountCreated":
        this.balance = 0;
        break;
      case "MoneyDeposited":
        this.balance += event.data.amount;
        break;
      case "MoneyWithdrawn":
        this.balance -= event.data.amount;
        break;
    }
  }

  getBalance() {
    return this.balance;
  }

  deposit(amount: number) {
    const event: Event = {
      type: "MoneyDeposited",
      data: { accountId: this.accountId, amount },
    };
    this.store.addEvent(event);
    this.apply(event);
  }

  withdraw(amount: number) {
    if (this.balance < amount) throw new Error("Insufficient balance");
    const event: Event = {
      type: "MoneyWithdrawn",
      data: { accountId: this.accountId, amount },
    };
    this.store.addEvent(event);
    this.apply(event);
  }

  static createAccount(store: EventStore, accountId: string) {
    const event: Event = { type: "AccountCreated", data: { accountId } };
    store.addEvent(event);
    return new BankAccount(accountId, store);
  }
}
