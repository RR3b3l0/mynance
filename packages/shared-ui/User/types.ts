export interface UserInfo {
  id: string;
  name: string;
  balance: number;
  expenses: Expense[];
  movements: Movement[];
  totalExpenses: number
}

export interface Expense {
  id: number
  name: string;
  amount: number;
  description: string;
}

export interface Movement {
  id: number,
  amount: number;
  description: string;
  previousBalance: number;
}
