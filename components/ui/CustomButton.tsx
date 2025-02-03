import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, { opacity: disabled && (0.5 as any) }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0235B2",
    paddingVertical: 12,
    paddingHorizontal: 11,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "50%",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
