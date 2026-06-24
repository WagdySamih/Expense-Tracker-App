import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Expense } from "../models";
import { DUMMY_EXPENSES } from "../data/mock";
import {
  deleteExpenseAPI,
  getExpensesAPI,
  storeExpenseAPI,
  updateExpenseAPI,
} from "./https";

type Params = {
  expenses: Expense[];
  addExpense: (payload: Omit<Expense, "id">) => void;
  updateExpense: (payload: Expense) => void;
  deleteExpense: (id: string) => void;
  isLoading: boolean;
};

export const ExpensesContext = createContext<Params>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  isLoading: false,
});

const ExpensesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getExpensesAPI()
      .then((res) =>
        setExpenses(
          res.map((ex) => ({
            ...ex,
            date: new Date(ex.date),
          })),
        ),
      )
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const deleteExpense = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteExpenseAPI(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (payload: Omit<Expense, "id">) => {
    try {
      setIsLoading(true);
      const res = await storeExpenseAPI(payload);

      setExpenses((prev) => [
        {
          ...payload,
          id: res.data.name,
        },
        ...prev,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateExpense = async (payload: Expense) => {
    try {
      setIsLoading(true);
      await updateExpenseAPI(payload.id, payload);
      setExpenses((prev) =>
        prev.map((ex) => (ex.id === payload.id ? payload : ex)),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        isLoading,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
