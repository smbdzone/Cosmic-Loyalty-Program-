import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./CustomButton";
import * as Clipboard from "expo-clipboard";
import { handleCopyReferal } from "@/utils/globals";
import { UserProps } from "@/app/types/types";

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

interface User {
  name: string;
  referralCode: string;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const { user, logout } = useAuthStore() as { user: User; logout: () => void };
  const handleCopy = async () => {
    await handleCopyReferal(user as UserProps);
  };
  return (
    <ImageBackground
      source={require("@/assets/icon/background.png")}
      style={styles.backgroundImage}
      imageStyle={{
        resizeMode: "cover",
        height: 840,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
      }}
    >
      <View
        style={{
          width: "90%",
          paddingHorizontal: 10,
          marginTop: 120,
        }}
        {...props}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#000000"
          />
        </View>
        <View style={{ marginVertical: 20, width: "90%" }}>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            bottom: 0,
            height: 300,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginBottom: 10,
              }}
            >
              Your Referral Code
            </Text>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <TouchableOpacity onPress={handleCopy}>
                <Text
                  style={{
                    borderWidth: 1,
                    width: 210,
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 18,
                    letterSpacing: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#0235B2",
                    borderColor: "lightgray",
                  }}
                >
                  {user ? user.referralCode : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("@/assets/icon/logo.png")}
            style={styles.logo}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: "flex-start",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    width: "90%",
    alignContent: "center",
    margin: "auto",
  },
  input: {
    height: 40,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000000",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CustomDrawerContent;
