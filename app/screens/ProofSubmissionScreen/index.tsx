import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import RewardsFooter from "@/components/ui/RewardsFooter";
import Header from "@/components/ui/Header";
import PointsComponent from "@/components/ui/PointsComponent";
import CustomButton from "@/components/ui/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { useMediaStore } from "@/store/uploadMediaStore";
import { selectImages } from "@/utils/selectImages";

const ProofSubmissionScreen = () => {
  const { user } = useAuthStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { uploadImages } = useMediaStore();
  const [selectedImages, setSelectedImages] = useState<any>([]);

  const handleSelectImages = async () => {
    try {
      const images: any = await selectImages(4, Alert);
      if (images.length <= 4) {
        setSelectedImages((prev: any) => [...prev, ...images]);
      } else {
        Alert.alert("Limit", "You can upload maximum 4 images.");
      }
    } catch (error: any) {
      console.error("Error selecting images:", error.message);
    }
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      Alert.alert("No Images", "Please select images to upload.");
      return;
    }

    await uploadImages(selectedImages);
    setSelectedImages([]);
    Alert.alert("Success", "Images uploaded successfully!");
  };

  const unselectImage = (index: number) => {
    setSelectedImages((prevImages: any) =>
      prevImages.filter((_: any, i: number) => i !== index)
    );
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
          <View
            style={{
              width: "85%",
              marginTop: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Proof Submission
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Submission-history")}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Submission History
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "85%",
              borderRadius: 20,
              overflow: "hidden",
              marginTop: 20,
            }}
          >
            <ImageBackground
              source={require("@/assets/images/bg-proof-submission.png")}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                margin: "0 auto",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 10,
                rowGap: 4,
                columnGap: 4,
                paddingLeft: 20,
              }}
              imageStyle={{ resizeMode: "cover" }}
            >
              <TouchableOpacity
                onPress={handleSelectImages}
                style={{
                  backgroundColor: "#D9D9D9",
                  width: "23%",
                  height: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20 }}>+</Text>
              </TouchableOpacity>
              {selectedImages.map((image: any, index: number) => (
                <View
                  style={{
                    // backgroundColor: "#D9D9D9",
                    width: "23%",
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    // overflow:"hidden"
                  }}
                >
                  <ImageBackground
                    key={index}
                    source={{ uri: image.uri }}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      height: 150,
                      overflow: "hidden",
                    }}
                    imageStyle={{ resizeMode: "contain" }}
                  >
                    <TouchableOpacity onPress={() => unselectImage(index)}>
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: 10,
                          backgroundColor: "red",
                          color: "#fff",
                          borderRadius: 50,
                          width: 20,
                          height: 20,
                          right: 5,
                          top: 3,
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          textAlign: "center",
                          paddingRight: 2,
                          paddingTop: 2,
                          zIndex: 1,
                        }}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ))}
            </ImageBackground>
          </View>
          <View style={{ marginTop: 20, width: "70%" }}>
            <CustomButton title="Submit" onPress={handleUpload} />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RewardsFooter
              isPopupVisible={isPopupVisible}
              setIsPopupVisible={setIsPopupVisible}
            />
          </View>
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
    marginTop: 10,
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
  pointsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  pointsText: {
    color: "#0235B2",
    fontSize: 18,
  },
  imageContainer: {
    width: "90%",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: -10,
  },
  loyaltyImage: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },
  sectionContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -50,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  learnMore: {
    color: "#ffffff",
    opacity: 0.7,
    fontSize: 16,
  },
});

export default ProofSubmissionScreen;
