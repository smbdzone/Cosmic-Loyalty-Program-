import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

const GetStartedScreen = () => {
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
      <View style={{ width: "95%", position: "absolute", top: 80, left: 0 }}>
        <Image
          style={{ width: "100%", objectFit: "contain" }}
          source={require("@/assets/images/rocket-line-image.png")}
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
        <Text style={{ fontSize: 60, fontWeight: "600" }}>Hello!</Text>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate("Welcome")}
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

export default GetStartedScreen;
