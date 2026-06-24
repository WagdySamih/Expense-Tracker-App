import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../models";
import { GlobalStyles } from "../constants";

type Props = {
  periodName: string;
  expenses: Expense[];
};

export const ExpensesSummary: React.FC<Props> = ({ expenses, periodName }) => {
  const sum = expenses.reduce((s, expense) => s + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
