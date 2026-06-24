import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants";

export const LoadingOverlay: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray500,
    opacity: 0.2,
  },
});
