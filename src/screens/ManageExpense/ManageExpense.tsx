import { Platform, StyleSheet, Text, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Trash } from "lucide-react-native";

import { Button, IconButton, Input } from "../../components";
import { GlobalStyles } from "../../constants";
import { ExpensesContext } from "../../store/ExpensesContext";
import { formatDate } from "../../utils";
import { Expense } from "../../models";
import { StatusBar } from "expo-status-bar";

type Form = {
  description?: string;
  amount?: string;
  date?: string;
};

const ManageExpense: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { expenses, deleteExpense, updateExpense, addExpense, isLoading } =
    useContext(ExpensesContext);

  const [form, setForm] = useState<Form>();
  const [errors, setErrors] = useState<Form>({});

  const id = (route.params as any)?.id;
  const isEditMode = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add New Expense",
    });

    if (isEditMode) {
      const expense = expenses.find((ex) => ex.id === id);
      if (!expense) return;

      setForm({
        amount: expense.amount.toString(),
        description: expense.description,
        date: formatDate(expense.date),
      });
    }
  }, [navigation, isEditMode]);

  const onFieldChange = (field: keyof Form, value: string) => {
    onFieldValidate(field, "");
    setForm((prev) => ({ ...(prev || {}), [field]: value }));
  };

  const onFieldValidate = (field: keyof Form, value: string) => {
    setErrors((prev) => ({ ...(prev || {}), [field]: value }));
    return false;
  };

  const onConfirm = async () => {
    let isValid = true;

    if (form?.amount && +form.amount <= 0)
      isValid = onFieldValidate("amount", "Amount must be positive number");
    if (!form?.amount)
      isValid = onFieldValidate("amount", "Amount is required");

    if (!form?.description?.trim())
      isValid = onFieldValidate("description", "Description is required");

    if (form?.date && new Date(form.date).toString() === "Invalid Date")
      isValid = onFieldValidate("date", "Please enter a valid date");
    if (!form?.date) isValid = onFieldValidate("date", "Date is required");

    if (!isValid) return;

    const payload = {
      amount: +form?.amount!,
      date: new Date(form?.date!),
      description: form?.description,
    } as Omit<Expense, "id">;

    if (isEditMode) await updateExpense({ id, ...payload });
    else await addExpense(payload);

    navigation.goBack();
  };

  return (
    <>
      {Platform.OS === "android" && <StatusBar style="dark" />}
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Your Expense</Text>
          <View style={styles.rowInput}>
            <Input
              label="Amount"
              keyboardType="decimal-pad"
              autoCorrect={false}
              style={styles.input}
              value={form?.amount?.toString() || ""}
              onChangeText={(text) => onFieldChange("amount", text)}
              error={errors?.amount}
            />
            <Input
              label="Date"
              placeholder="YYYY-MM-DD"
              maxLength={10}
              autoCorrect={false}
              style={styles.input}
              value={form?.date?.toString() || ""}
              onChangeText={(text) => onFieldChange("date", text)}
              error={errors?.date}
            />
          </View>
          <Input
            label="Description"
            numberOfLines={3}
            autoCorrect={false}
            multiline
            value={form?.description || ""}
            onChangeText={(text) => onFieldChange("description", text)}
            error={errors?.description}
          />
        </View>

        <View style={styles.btnsContainer}>
          <Button
            text="Cancel"
            variant="text"
            onPress={() => navigation.goBack()}
            style={styles.btn}
          />
          <Button
            text="Confirm"
            onPress={onConfirm}
            style={styles.btn}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
        {isEditMode && (
          <IconButton
            icon={<Trash color={GlobalStyles.colors.error500} />}
            onPress={() => {
              deleteExpense(id);
              navigation.goBack();
            }}
            isLoading={isLoading}
            styles={styles.deleteBtn}
          />
        )}
      </View>
    </>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: GlobalStyles.colors.primary50,
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  form: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  rowInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 16,
  },
  btn: {
    flex: 1,
    minHeight: 30,
    justifyContent: "center",
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
