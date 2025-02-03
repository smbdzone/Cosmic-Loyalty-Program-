import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "@/components/ui/CustomInput";
import RegisterationLayout from "@/components/ui/RegisterationLayout";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const setEmail = useAuthStore((state) => state.setEmail);
  const email = useAuthStore((state) => state.email);
  const error = useAuthStore((state) => state.error);
  const navigation = useNavigation();

  const handleLogin = async () => {
    await login(email, password, navigation);
  };

  return (
    <RegisterationLayout
      handlePress={handleLogin}
      isLogin={true}
      navigationRoute="Register"
      btnTitle="Login"
      headingText="Sign in to continue!"
      disabled={!email || !password}
    >
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={{ width: "70%" }}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          icon={require("@/assets/icon/email-icon.png")}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
    </RegisterationLayout>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
