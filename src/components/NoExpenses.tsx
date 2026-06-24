import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Wallet } from "lucide-react-native";

import { Button } from "./Button";

type Props = {
  message?: string;
};

export const NoExpenses = ({ message = "No Expenses Found" }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Wallet color={"white"} size={36} />
      <Text style={styles.text}>{message}</Text>
      <Button
        onPress={() => navigation.navigate("ManageExpense")}
        text="Add New Expense"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 16,

    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    paddingBottom: 100,
    flex: 1,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
