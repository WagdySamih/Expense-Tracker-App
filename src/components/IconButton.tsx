import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants";

type Props = {
  onPress: () => void;
  icon: React.ReactNode;
  styles?: StyleProp<any>;
};

export const IconButton: React.FC<Props> = ({
  onPress,
  icon,
  styles: optionalStyles = {},
}) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: GlobalStyles.colors.primary500 }}
    style={({ pressed }) => [
      styles.container,
      optionalStyles,
      pressed ? styles.pressed : null,
    ]}
  >
    {icon}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
