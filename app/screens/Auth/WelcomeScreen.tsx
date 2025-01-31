import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{ width: "95%", position: "absolute", bottom: -40, left: 0 }}
      >
        <Image
          style={{ width: "100%", objectFit: "contain" }}
          source={require("@/assets/images/start-animation-image.png")}
        />
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
          >
            welcome to
          </Text>
          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              marginTop: -6,
              marginBottom: 20,
            }}
          >
            our loyalty app!
          </Text>
        </View>
        <CustomButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <CustomButton
          title="Sign up"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Image
        style={{ width: 96, height: 40, position: "absolute", bottom: 20 }}
        source={require("@/assets/icon/logo-blue.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default WelcomeScreen;
