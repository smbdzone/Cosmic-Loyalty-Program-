import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/ui/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useUserStore } from "@/store/userStore";
import { selectImages } from "@/utils/selectImages";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { handleCopyReferal } from "@/utils/globals";
import { UserProps } from "@/app/types/types";
import { tiersData } from "@/constants/contants";

const ProfileScreen = () => {
  const { user, fetchUser, updateProfileImg, updateUser } = useUserStore();
  const [name, setName] = useState<string>(user?.name || "");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { height, width, scale, fontScale } = useWindowDimensions();

  const handleSelectImages = async () => {
    try {
      const image: any = await selectImages(1, Alert);
      if (image.length <= 1) {
        setSelectedImage(image[0]);
      } else {
        Alert.alert("Limit", "You can upload maximum 4 images.");
      }
    } catch (error: any) {
      console.log("Error selecting images:", error.message);
    }
  };

  const handleUpload = async () => {
    if (selectedImage.length === 0) {
      Alert.alert("No Images", "Please select images to upload.");
      return;
    }

    await updateProfileImg(selectedImage);
    setSelectedImage(null);
    Alert.alert("Success", "Images uploaded successfully!");
  };

  const handleUpdate = async () => {
    if (!name && !password) {
      Alert.alert("Invalid Fields", "Fields are required");
      return;
    }

    await updateUser(name, password);
    Alert.alert("Success", "Changes saved successfully!");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCopy = async () => {
    await handleCopyReferal(user as UserProps);
  };

  return (
    <LinearGradient
      colors={["rgb(52, 52, 52)", "rgba(0, 0, 0, 1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[1, 1, 0.3]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <ImageBackground
          source={require("@/assets/icon/background.png")}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            backgroundAttachment: "fixed",
          }}
          imageStyle={{ resizeMode: "cover" }}
        >
          <Header />
          <View style={[styles.welcomeContainer, { width: width * 0.85 }]}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={!selectedImage || (!user?.profileImg && styles.avatar)}
              >
                <TouchableOpacity onPress={handleSelectImages}>
                  {selectedImage || user?.profileImg ? (
                    <ImageBackground
                      resizeMode="cover"
                      style={{ height: 80, width: 80 }}
                      imageStyle={{ borderRadius: 50 }}
                      source={{ uri: selectedImage?.uri || user?.profileImg }}
                    ></ImageBackground>
                  ) : (
                    <Icon name="person" size={50} color="#0235B2" />
                  )}
                </TouchableOpacity>
              </View>
              {selectedImage && (
                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                      padding: 12,
                    }}
                    onPress={() => setSelectedImage(null)}
                  >
                    <Text style={{ color: "#fff" }}>Cancel</Text>
                  </TouchableOpacity>
                  <CustomButton title="Save" onPress={handleUpload} />
                </View>
              )}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}
                >
                  {user?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  {user?.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                padding: 20,
                marginTop: 20,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                height: 290,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // alignItems: "center",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#D9D9D9",
                    width: "30%",
                    height: 150,
                    borderRadius: 20,
                  }}
                >
                  <Image
                    source={{ uri: user?.tierImage }}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      height: 180,
                      overflow: "hidden",
                      position: "absolute",
                      top: -30,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                  >
                    {user?.tier?.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontScale * 12.5,
                      color: "#fff",
                      width: width * 0.45,
                      textAlign: "justify",
                    }}
                  >
                    {tiersData.find((data) => data.name === user?.tier)?.desc}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  marginTop: -50,
                }}
              >
                <Image
                  style={{ width: "100%", resizeMode: "contain" }}
                  source={
                    user?.tier === "cadet"
                      ? require("@/assets/images/cadet-tier.png")
                      : user?.tier === "explorer"
                      ? require("@/assets/images/explorer-tier.png")
                      : user?.tier === "captain"
                      ? require("@/assets/images/captain-tier.png")
                      : user?.tier === "commander" &&
                        require("@/assets/images/commander-tier.png")
                  }
                />
              </View>
            </View>
            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: -10,
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                width: "100%",
                borderRadius: 20,
              }}
            >
              <CustomInput
                icon={require("@/assets/icon/edit.png")}
                placeholder="Name"
                value={name || ""}
                onChangeText={setName}
              />
              <CustomInput
                placeholder="Email"
                value={user?.email || ""}
                editable={false}
              />
              <CustomInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon={require("@/assets/icon/edit.png")}
              />
              <View style={{ marginTop: 20 }}>
                <CustomButton title="Save Changes" onPress={handleUpdate} />
              </View>
            </View>

            <View
              style={{
                width: "50%",
                margin: "auto",
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  marginVertical: 5,
                  borderRadius: 10,
                }}
              >
                Your Referral Code
              </Text>
              <TouchableOpacity onPress={handleCopy}>
                <Text
                  style={{
                    backgroundColor: "#fff",
                    // marginHorizontal: 20,
                    color: "rgba(157, 157, 157, 0.92)",
                    borderRadius: 10,
                    padding: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                    letterSpacing: 10,
                  }}
                >
                  {user?.referralCode}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <RewardsFooter /> */}
        </ImageBackground>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    marginTop: 40,
    width: "85%",
    gap: 20,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 18,
  },

  avatar: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
  },
});

export default ProfileScreen;
