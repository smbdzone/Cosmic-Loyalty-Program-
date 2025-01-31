import Accordion from "@/components/ui/CustomAccordion";
import Header from "@/components/ui/Header";
import { ranks } from "@/constants/contants";
import { useNotificationsStore } from "@/store/notificationStore";
import { useReferralStore } from "@/store/referalStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Linking,
  Alert,
} from "react-native";

const SupportScreen = () => {
  const faqData = [
    {
      title: "How does the point system work?",
      content: "Explanation about points.",
    },
    {
      title: "Can I get free services?",
      content: "Details about free services.",
    },
    {
      title: "What is SMB DigitalZone about?",
      content: "Information about SMB DigitalZone.",
    },
    { title: "How to redeem points?", content: "Steps to redeem your points." },
  ];

  const openWhatsApp = () => {
    const phoneNumber = "+971559199661"; // Replace with your WhatsApp number
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            "WhatsApp not installed",
            "Please install WhatsApp to chat with us."
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <LinearGradient
      colors={["rgb(52, 52, 52)", "rgba(0, 0, 0, 1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[1, 1, 0.3]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
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
          <View style={{ width: "80%" }}>
            <Text style={styles.title}>How can we help?</Text>
          </View>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationItem}>
              <Accordion data={faqData} />
            </View>
          </View>
          <View style={styles.notificationContainer}>
            <TouchableOpacity
              onPress={openWhatsApp}
              style={styles.notificationItem}
            >
              <Text style={{ fontWeight: "bold" }}>Send us a message</Text>
              <Image
                style={styles.icon}
                source={require("@/assets/icon/sms-icon.png")}
              />
            </TouchableOpacity>
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
  notificationContainer: {
    width: "85%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  notificationItem: {
    // marginBottom: 16,
    padding: 16,
    borderColor: "#ddd",
    borderRadius: 15,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginTop: 30,
  },
  body: {
    marginTop: 8,
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SupportScreen;
