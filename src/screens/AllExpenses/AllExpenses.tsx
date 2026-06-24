import { StyleSheet, Text, View } from "react-native";
import { ExpensesList, ExpensesSummary } from "../../components";
import { DUMMY_EXPENSES } from "../../data/mock";

const AllExpenses: React.FC = () => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName="Total" />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
