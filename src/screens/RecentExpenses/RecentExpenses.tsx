import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import {
  ExpensesList,
  ExpensesSummary,
  NoExpenses,
  LoadingOverlay,
} from "../../components";
import { ExpensesContext } from "../../store/ExpensesContext";
import { getDateMinusDays } from "../../utils";

const RecentExpenses: React.FC = () => {
  const { expenses, isLoading } = useContext(ExpensesContext);
  const dateFrom7days = getDateMinusDays(new Date(), 7);
  const recentExpenses = expenses.filter((ex) => ex.date > dateFrom7days);

  return (
    <>
      <View style={styles.container}>
        <ExpensesSummary expenses={recentExpenses} periodName="Last 7 days" />
        {isLoading ? (
          <LoadingOverlay />
        ) : expenses.length ? (
          <ExpensesList expenses={recentExpenses} />
        ) : (
          <NoExpenses message="You don't have any expenses recently" />
        )}
      </View>
    </>
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
