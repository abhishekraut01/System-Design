export type Event =
  | { type: 'AccountCreated'; data: { accountId: string } }
  | { type: 'MoneyDeposited'; data: { accountId: string; amount: number } }
  | { type: 'MoneyWithdrawn'; data: { accountId: string; amount: number } };
