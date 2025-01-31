import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomInput from "@/components/ui/CustomInput";
import RegisterationLayout from "@/components/ui/RegisterationLayout";
import { RootStackParamList } from "@/types/navigation";
import { StyleSheet, Text, View } from "react-native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const register = useAuthStore((state) => state.register);
  const setEmail = useAuthStore((state) => state.setEmail);
  const error = useAuthStore((state) => state.error);
  const email = useAuthStore((state) => state.email);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    await register(name, email, password, referralCode, navigation);
  };

  return (
    <RegisterationLayout
      handlePress={handleRegister}
      isLogin={false}
      navigationRoute="Login"
      btnTitle="Sign Up"
      headingText="Create a new account"
    >
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={{ width: "70%" }}>
        <CustomInput
          icon={require("@/assets/icon/name-icon.png")}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          icon={require("@/assets/icon/email-icon.png")}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon={require("@/assets/icon/eye.png")}
        />
        <CustomInput
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChangeText={setReferralCode}
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

export default RegisterScreen;
