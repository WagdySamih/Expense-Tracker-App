import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { ExpensesList, ExpensesSummary, NoExpenses } from "../../components";
import { ExpensesContext } from "../../store/ExpensesContext";
import { EqualApproximately, Text } from "lucide-react-native";

const AllExpenses: React.FC = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName="Total" />
      {expenses.length ? <ExpensesList expenses={expenses} /> : <NoExpenses />}
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  noExpenses: {
    textAlign: "center",
    color: "white",
    padding: 16,
    margin: "auto",
  },
});
