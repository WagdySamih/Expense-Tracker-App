import { createContext, PropsWithChildren, useState } from "react";
import { Expense } from "../models";
import { DUMMY_EXPENSES } from "../data/mock";

type Params = {
  expenses: Expense[];
  addExpense: (payload: Omit<Expense, "id">) => void;
  updateExpense: (payload: Expense) => void;
  deleteExpense: (id: string) => void;
};

export const ExpensesContext = createContext<Params>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

const ExpensesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const addExpense = (payload: Omit<Expense, "id">) => {
    setExpenses((prev) => [
      {
        id: Math.random().toString(),
        ...payload,
      },
      ...prev,
    ]);
  };

  const updateExpense = (payload: Expense) => {
    setExpenses((prev) =>
      prev.map((ex) => (ex.id === payload.id ? payload : ex)),
    );
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
