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
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const register = useAuthStore((state) => state.register);
  const setEmail = useAuthStore((state) => state.setEmail);
  const error = useAuthStore((state) => state.error);
  const email = useAuthStore((state) => state.email);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Password validation function
  const validatePassword = (text: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,_])[A-Za-z\d@$!%*?&.,_]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError(
        "Password must be at least 8 characters long, with one uppercase, one lowercase, one number, and one special character."
      );
    } else {
      setPasswordError(null);
    }
    setPassword(text);
  };

  const handleRegister = async () => {
    if (passwordError) return; // Prevent registration if password is invalid
    await register(name, email, password, referralCode, navigation);
  };

  return (
    <RegisterationLayout
      handlePress={handleRegister}
      isLogin={false}
      navigationRoute="Login"
      btnTitle="Sign Up"
      disabled={
        !email || !password || !name || (passwordError?.length as any) > 0
      }
      headingText="Create a new account"
    >
      {error && <Text style={styles.errorText}>{error}</Text>}
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
          onChangeText={validatePassword}
          secureTextEntry
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
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
    fontSize: 12,
  },
});

export default RegisterScreen;
