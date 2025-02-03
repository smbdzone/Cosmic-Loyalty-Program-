import React, { useState } from "react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible} // Toggles secure entry
        editable={editable}
      />
      {icon && <Image source={icon} style={styles.icon} />}
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={
              isPasswordVisible
                ? require("@/assets/icon/eye.png") // Eye open icon
                : require("@/assets/icon/eye-close.png") // Eye closed icon
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#888",
  },
});

export default CustomInput;
