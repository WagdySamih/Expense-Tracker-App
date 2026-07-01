import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
} from "react-native";
import { GlobalStyles } from "../constants";

type Props = {
  text?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<any>;
  variant?: "primary" | "text";
  isLoading?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  text,
  onPress,
  style,
  variant = "primary",
  isLoading = false,
  disabled = false,
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.container,
      pressed ? styles.pressed : null,
      variant === "text" && styles.flat,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{text}</Text>
    {isLoading && <ActivityIndicator size={"small"} color={"white"} />}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    backgroundColor: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 4,
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    color: GlobalStyles.colors.primary50,
  },
});
