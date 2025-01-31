import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import Popup from "./CustomModal";
import CustomButton from "./CustomButton";
import { handleCopyReferal } from "@/utils/globals";

interface RewardsFooterProps {
  isPopupVisible: boolean;
  setIsPopupVisible: (visible: boolean) => void;
}

const RewardsFooter: React.FC<RewardsFooterProps> = ({
  isPopupVisible,
  setIsPopupVisible,
}) => {
  const { user } = useAuthStore();

  const handleCopy = async () => {
    if (user) {
      await handleCopyReferal(user);
    }
  };

  const shareAppLink = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out this amazing app! 🚀\nDownload here: https://your-app-link.com",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared via", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <Popup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        title="Referral Code"
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              borderWidth: 1,
              width: 200,
              padding: 10,
              borderRadius: 24,
              fontSize: 18,
              letterSpacing: 10,
              textAlign: "center",
              fontWeight: "bold",
              color: "lightgray",
              borderColor: "lightgray",
            }}
          >
            {user ? user.referralCode : ""}
          </Text>
          <View style={{ marginTop: 20 }}>
            <CustomButton title="Copy" onPress={handleCopy} />
          </View>
        </View>
      </Popup>
      <View
        style={{
          marginTop: 20,
          width: "85%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.sectionTitle}>Earn Rewards</Text>
        {/* <Text style={styles.learnMore}>Learn More</Text> */}
      </View>
      <View style={{ position: "relative", flexDirection: "row", gap: 10 }}>
        <TouchableOpacity onPress={shareAppLink} style={styles.bottomContainer}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Share
          </Text>
          <Text style={{ width: 100, color: "#fff", fontSize: 9 }}>
            Share SMB DigitalZone content with branded hashtags. Earn 20
            points...
          </Text>
          <Image
            style={styles.bottomContainerImage}
            source={require("@/assets/images/cloud.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsPopupVisible(true)}
          style={styles.bottomContainer}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Refer a friend
          </Text>
          <Text style={{ width: 120, color: "#fff", fontSize: 9 }}>
            Earn 50 points per referral after the referred friend completes
            sign-up.
          </Text>
          <Image
            style={styles.bottomContainerImage}
            source={require("@/assets/images/bag.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

  bottomContainer: {
    backgroundColor: `rgba(217, 217, 217, 0.2)`,
    borderRadius: 20,
    padding: 20,
    width: 170,
    height: 120,
    marginTop: 10,
  },
  bottomContainerImage: {
    position: "absolute",
    right: -22,
    top: 30,
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
});

export default RewardsFooter;
