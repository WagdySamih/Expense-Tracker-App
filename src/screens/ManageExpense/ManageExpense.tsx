import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Trash } from "lucide-react-native";

import { Button, IconButton } from "../../components";
import { GlobalStyles } from "../../constants";

const ManageExpense: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const id = (route.params as any)?.id;
  const isEditMode = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add New Expense",
    });
  }, [navigation, isEditMode]);

  return (
    <View style={styles.container}>
      <View style={styles.btnsContainer}>
        <Button
          text="Cancel"
          variant="text"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          text="Confirm"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      {isEditMode && (
        <IconButton
          icon={<Trash color={GlobalStyles.colors.error500} />}
          onPress={() => {
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
