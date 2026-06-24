import { Expense } from "../models";

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.59,
    date: new Date(),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2026-6-20"),
  },
  {
    id: "e3",
    description: "A pair of glasses",
    amount: 119.99,
    date: new Date("2026-6-22"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 9.99,
    date: new Date("2026-6-24"),
  },
];
