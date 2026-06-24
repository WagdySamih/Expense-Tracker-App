import axios from "axios";
import { Expense } from "../models";

const API_URL =
  "https://wagdy-expense-tracker-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpenseAPI = async (expense: Omit<Expense, "id">) => {
  return await axios.post(`${API_URL}/expenses.json`, expense);
};

export const getExpensesAPI = async () => {
  const res = await axios.get(`${API_URL}/expenses.json`);

  const expenses = [];

  for (const key in res.data) {
    const expense = {
      id: key,
      amount: res.data[key].amount,
      date: res.data[key].date,
      description: res.data[key].description,
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpenseAPI = (id: string, payload: Omit<Expense, "id">) => {
  return axios.put(`${API_URL}/expenses/${id}.json`, payload);
};

export const deleteExpenseAPI = (id: string) => {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
};
