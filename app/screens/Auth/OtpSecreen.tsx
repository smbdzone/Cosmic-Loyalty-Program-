import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";

const OtpScreen = () => {
  const [otp, setOtp] = useState("");
  const email = useAuthStore((state) => state.email);
  const verifyOTP = useAuthStore((state) => state.verifyOTP);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleVerifyOTP = async () => {
    await verifyOTP(email, otp);
    navigation.navigate("Home");
  };

  return (
    <View
      style={styles.container}
      className="flex-1 border-[5px] border-black justify-center items-center bg-gray-900"
    >
      <Text style={styles.heading} className="text-white text-2xl mb-6">
        Enter OTP
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={{ width: "70%" }}>
        <CustomInput placeholder="XXXXXX" value={otp} onChangeText={setOtp} />
      </View>

      <View style={styles.btnDiv}>
        <CustomButton title="Verify" onPress={handleVerifyOTP} />
      </View>

      <TouchableOpacity
        style={styles.bottomText}
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-blue-400">Already verified? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 20,
    padding: 10,
    width: "100%",
    margin: "auto",
    flex: 1,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  emailText: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: 20,
    width: "90%",
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    borderWidth: 1,
    textAlign: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  bottomText: {
    marginTop: 20,
  },
});

export default OtpScreen;
