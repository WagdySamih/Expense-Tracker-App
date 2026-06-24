import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GlobalStyles } from "../constants";
type Props = {
  label?: string;
  style?: StyleProp<any>;
  error?: string;
} & TextInputProps;

export const Input: React.FC<Props> = ({ label, style, error, ...rest }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={[
          styles.input,
          rest.multiline && styles.multiline,
          !!error && styles.inputError,
        ]}
        placeholderTextColor={GlobalStyles.colors.gray700}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingVertical: 10,
    alignSelf: "flex-start",
    width: "100%",
  },
  label: {
    color: GlobalStyles.colors.primary100,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: GlobalStyles.colors.error50,
  },
  inputError: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
