import { EventStore } from "./eventStore.js";
import { BankAccount } from "./bankAccount.js";

const store = new EventStore();

// Create new account
const acc = BankAccount.createAccount(store, "A1");

// Perform actions
acc.deposit(1000);
acc.withdraw(200);
acc.deposit(500);

console.log("Balance:", acc.getBalance()); // 1300

// Rebuild account from scratch
const rebuilt = new BankAccount("A1", store);
console.log("Rebuilt balance:", rebuilt.getBalance()); // 1300 again

console.log("\nAll Events:");
console.log(store);
