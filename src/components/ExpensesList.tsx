import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Expense } from "../models";
import { GlobalStyles } from "../constants";

type Props = {
  expenses: Expense[];
};

export const ExpensesList: React.FC<Props> = ({ expenses }) => {
  const navigation = useNavigation<any>();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      style={styles.container}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.item,
            pressed ? styles.pressed : null,
          ]}
          onPress={() =>
            navigation.navigate("ManageExpense", {
              id: item.id,
            })
          }
        >
          <View>
            <Text style={[styles.textBase, styles.description]}>
              {item.description}
            </Text>
            <Text style={styles.textBase}>{item?.date?.toDateString?.()}</Text>
          </View>
          <Text style={[styles.textBase, styles.amount]}>{item.amount}</Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    marginBottom: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary100,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amount: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 4,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    minWidth: 80,
    textAlign: "center",
  },
});
