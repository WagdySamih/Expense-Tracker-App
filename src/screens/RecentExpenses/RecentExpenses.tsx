import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ExpensesList, ExpensesSummary } from "../../components";
import { DUMMY_EXPENSES } from "../../data/mock";
import { ExpensesContext } from "../../store/ExpensesContext";

const RecentExpenses: React.FC = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName="Last 7 days" />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
