import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { ExpensesList, ExpensesSummary, NoExpenses } from "../../components";
import { ExpensesContext } from "../../store/ExpensesContext";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const AllExpenses: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName="Total" />
      {isLoading ? (
        <LoadingOverlay />
      ) : expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <NoExpenses />
      )}
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
