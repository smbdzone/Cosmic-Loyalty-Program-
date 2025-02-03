import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RewardsFooter from "@/components/ui/RewardsFooter";
import Header from "@/components/ui/Header";
import PointsComponent from "@/components/ui/PointsComponent";
import { services } from "@/constants/contants";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useBookingStore } from "@/store/bookingStore";
import { useUserStore } from "@/store/userStore";
import Popup from "@/components/ui/CustomModal";
import { useAuthStore } from "@/store/authStore";

const RedemptionScreen = () => {
  const { checkFirstLogin, welcomeMessage } = useAuthStore();
  const { user, fetchUser } = useUserStore();
  const { createBooking } = useBookingStore();
  const [booking, setBooking] = useState({
    serviceName: "",
    remainingPricePoints: 0,
    servicePoints: 0,
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchUser();
  }, [booking, render]);

  const handleConfirm = async () => {
    try {
      // Create the booking with the service name and the points to redeem
      await createBooking(
        booking.serviceName,
        booking.remainingPricePoints,
        booking.servicePoints
      ).then(() => {
        setRender(true);
        setSuccessModal(true);
      });

      // Optionally, you can add a success message or redirect the user
      setModalVisible(false);
      setRender(false);
    } catch (error) {
      // Handle any errors that occur during the booking process
      console.error("Error confirming booking:", error);
    }
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
          <View style={styles.welcomeContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <View>
                <Text style={styles.welcomeText}>Hey, {user?.name}👋</Text>
                <Text style={styles.subText}>{welcomeMessage}</Text>
              </View>
              <View>
                <Text
                  style={{
                    backgroundColor: "#fff",
                    color: "rgba(0,0,0,0.5)",
                    paddingHorizontal: 5,
                    borderRadius: 50,
                    paddingVertical: 1,
                    fontSize: 11,
                  }}
                >
                  1 Point = AED 0.10
                </Text>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <View>
                <PointsComponent render={render} />
              </View>
              <Image
                source={require("@/assets/images/trophy.png")}
                style={styles.loyaltyImage}
              />
            </View>
          </View>
          <Popup
            visible={successModal}
            onClose={() => setSuccessModal(false)}
            title="Thank you for booking"
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Our admin will contact you soon.
              </Text>
              <Text>To get your requirements!</Text>
            </View>
          </Popup>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              width: "85%",
              marginTop: 20,
            }}
          >
            <ConfirmationModal
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
              title="Do you want to redeem your points for this service?"
              onConfirm={handleConfirm}
            />
            {services.map((service, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  const pointsRedeemed = Math.min(
                    (user?.points as number) ?? 0,
                    service?.servicePoints ?? 0
                  );

                  setBooking({
                    serviceName: service.name,
                    remainingPricePoints: pointsRedeemed,
                    servicePoints: service.servicePoints,
                  });
                }}
                style={{
                  backgroundColor: "rgba(217,217,217,0.2)",
                  paddingLeft: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                  paddingVertical: 10,
                }}
              >
                <View style={{ width: "72%" }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: width * 0.036,
                    }}
                  >
                    {service.title}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      textAlign: "justify",
                    }}
                  >
                    {service.desc}
                  </Text>
                </View>
                <View>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: width * 0.3,
                      height: 120,
                    }}
                    source={service.image}
                  />
                </View>
              </TouchableOpacity>
            ))}
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
  },
  subText: {
    color: "white",
    fontSize: 18,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loyaltyImage: {
    width: 40,
    height: 40,
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

export default RedemptionScreen;
