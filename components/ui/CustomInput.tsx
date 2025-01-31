import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: any;
  editable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  editable,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        width: "100%",
      }}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      {icon && (
        <TouchableOpacity>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    padding: 10,
    backgroundColor: "#ffffff",
    color: "#000000w",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CustomInput;
