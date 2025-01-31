import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import RewardsFooter from "@/components/ui/RewardsFooter";
import Header from "@/components/ui/Header";
import { useMediaStore } from "@/store/uploadMediaStore";

const SubmissionHistory = () => {
  const { user } = useAuthStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { images, fetchSubmissionHistory } = useMediaStore();

  useEffect(() => {
    fetchSubmissionHistory();
  }, []);

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
          <View style={{ width: "85%", marginTop: 30 }}>
            <Text
              style={{
                fontSize: 24,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Submission History
            </Text>
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
                justifyContent: "flex-start",
                paddingVertical: 20,
                paddingHorizontal: 10,
                rowGap: 2,
                columnGap: 2,
              }}
              imageStyle={{ resizeMode: "cover" }}
            >
              {images.map((data, index) =>
                data.images.map((image:any) => (
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
                      source={{ uri: image.url }}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        height: 150,
                        overflow: "hidden",
                      }}
                      imageStyle={{ resizeMode: "contain" }}
                    ></ImageBackground>
                  </View>
                ))
              )}
            </ImageBackground>
          </View>
          <RewardsFooter
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
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

export default SubmissionHistory;
