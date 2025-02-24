import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@/components/ui/SliderComponent";
import RewardsFooter from "@/components/ui/RewardsFooter";
import Header from "@/components/ui/Header";
import PointsComponent from "@/components/ui/PointsComponent";
import Popup from "@/components/ui/CustomModal";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "@/types/navigation";
import { NavigationProp } from "@react-navigation/native";

const HomeScreen = () => {
  const { user, welcomeMessage } = useAuthStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { height, width, scale, fontScale } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dataPoints = [
    require("@/assets/images/points-container.png"),
    require("@/assets/images/points-container-2.png"),
    // require("@/assets/images/points-container-2.png"),
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        width: width * 0.9,
        borderRadius: 20, // Ensure consistent border radius
        // overflow: "hidden", // Clip content inside the container
        height: 170,
      }}
    >
      <ImageBackground
        source={item}
        style={{
          width: "98%",
          height: 220,
          // paddingVertical: 20,
          top: -25,
          left: 7,
          borderRadius: 12,
          backgroundSize: "contain",
        }}
        resizeMode="contain"
        imageStyle={{
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            position: "absolute",
            right: 25,
            top: width * 0.15,
            color: "#fff",
            width: "66%",
            fontSize: 13,
          }}
        >
          Earn 1 point for every $1 spent on digital marketing or software
          development services.
        </Text>
        <View style={{ position: "absolute", right: 20, bottom: scale * 19 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/icon/star.png")}
              style={{ width: 18, height: 18 }}
            />
            <Text style={{ color: "#0235B2", fontSize: 18 }}>1</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

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
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hey, {user?.name}👋</Text>
            <Text style={styles.subText}>{welcomeMessage}</Text>
            <View style={{ marginTop: 20 }}>
              <PointsComponent />
            </View>
          </View>
          <View style={{ width: "90%", margin: "auto" }}>
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/alien-tiers.png")}
                style={styles.loyaltyImage}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Earn Points</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("How it works")}
            >
              <Text style={styles.learnMore}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%" }}>
            <Slider renderItem={renderItem} data={dataPoints} />
          </View>
          <View style={{ marginTop: -40 }}>
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
    gap: 0,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
  },
  subText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
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
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    marginTop: -70,
  },
  loyaltyImage: {
    width: "100%",
    height: 390,
    resizeMode: "contain",
  },
  sectionContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -90,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  learnMore: {
    color: "#ffffff",
    opacity: 0.7,
    fontSize: 13,
  },
});

export default HomeScreen;
