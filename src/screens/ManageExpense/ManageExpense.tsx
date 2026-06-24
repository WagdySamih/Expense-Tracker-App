import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Trash } from "lucide-react-native";

import { Button, IconButton } from "../../components";
import { GlobalStyles } from "../../constants";
import { ExpensesContext } from "../../store/ExpensesContext";

const ManageExpense: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { expenses, deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const id = (route.params as any)?.id;
  const isEditMode = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add New Expense",
    });
  }, [navigation, isEditMode]);

  const onConfirm = () => {
    if (isEditMode)
      updateExpense({
        id,
        amount: 10,
        description: "New Expense",
        date: new Date(),
      });
    else
      addExpense({ amount: 10, description: "New Expense", date: new Date() });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnsContainer}>
        <Button
          text="Cancel"
          variant="text"
          onPress={() => navigation.goBack()}
          style={styles.btn}
        />
        <Button text="Confirm" onPress={onConfirm} style={styles.btn} />
      </View>
      {isEditMode && (
        <IconButton
          icon={<Trash color={GlobalStyles.colors.error500} />}
          onPress={() => {
            deleteExpense(id);
            navigation.goBack();
          }}
          styles={styles.deleteBtn}
        />
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  btn: {
    flex: 1,
  },
  deleteBtn: {
    margin: 0,
    marginTop: 16,
    padding: 12,
    alignItems: "center",
    borderTopColor: GlobalStyles.colors.primary100,
    borderTopWidth: 2,
    borderRadius: 8,
  },
});
