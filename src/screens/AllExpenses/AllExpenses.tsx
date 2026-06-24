import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { ExpensesList, ExpensesSummary } from "../../components";
import { ExpensesContext } from "../../store/ExpensesContext";

const AllExpenses: React.FC = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName="Total" />
      <ExpensesList expenses={expenses} />
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
});
