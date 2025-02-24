import React, { useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/ui/Header";
import Icon from "react-native-vector-icons/AntDesign";
import Carousel from "react-native-reanimated-carousel";

const data = [
  {
    title: "Earning Points",
    image: require("@/assets/images/earning-points.png"),
    description: `The Cosmic Loyalty Program offers multiple ways 
    for users to earn points that can be redeemed for
    discounts on SMB DigitalZone services.
    Here’s how you can start earning:`,
  },
  {
    title: "Sign-Up Rewards",
    image: require("@/assets/images/signup-rewards.png"),
    description: `Newsletter Sign-Up:
    Earn 100 points by signing up for our newsletter on the SMB DigitalZone website.

    Loyalty App Sign-Up:
    New users who sign up for our loyalty app will receive 100 points (one-time offer).`,
  },
  {
    title: "Referral Rewards",
    image: require("@/assets/images/referral-rewards.png"),
    description: `Refer a Friend:
    Earn 50 points for each friend you refer who completes the sign-up process for our newsletter or app. You can refer up to 10 friends per month.

    Bonus Points:
    For each successful referral, you can earn additional bonus points.`,
  },
  {
    title: "Social Media Advocacy",
    image: require("@/assets/images/social-media-advocacy.png"),
    description: `Mention Us: Earn 30 points for each mention of SMB DigitalZone in your social 
    media posts or comments. You can earn points for up to 3 posts or comments per week. Make 
    sure to upload a screenshot to the app for verification. 
    
    Share Content: Earn 20 points for 
    sharing our content with branded hashtags. Proof of sharing must be uploaded for points to 
    be awarded.`,
  },
  {
    title: "Earning Points",
    image: require("@/assets/images/redeem-points.png"),
    description: `Points accumulated through the Cosmic Loyalty Program can be redeemed for 
    discounts on our platform.`,
  },
  {
    title: "Earning Points",
    image: require("@/assets/images/redeem-points.png"),
    description: `Here’s how it works:

    Redemption Rate

    1 point = AED 0.10. For example, 500 points = AED 50 discount on any service.`,
  },
  {
    title: "Earning Points",
    image: require("@/assets/images/applying-points.png"),
    description: `Applying Points

    Points can be used to cover up to 25% of the total cost of a service.

    For example, if your total service cost is AED 200, you can apply a maximum of 500 points (worth AED 50).`,
  },
  {
    title: "Earning Points",
    image: require("@/assets/images/redemption-process.png"),
    description: `Redemption Process

    Points are redeemable only for discounts and cannot be converted to cash.

    To redeem points, select the desired service on our platform and choose to apply your points during checkout. The discount will be automatically applied to your total.`,
  },
  {
    title: "Keeping Track",
    image: require("@/assets/images/keeping-track.png"),
    description: `Redemption Process

    Our app acts as the central hub for the Cosmic Loyalty Program:

    User Dashboard: View your total points, redeemed points, and potential discounts.

    Referral Tracking: Use unique referral codes or links to track your referrals in real-time.

    Proof Submission: Upload screenshots of social media mentions or shares for verification.

    Notifications: Receive push notifications when you earn points, redeem points, or when your social media proof is approved.`,
  },
  {
    title: "Was it helpful?",
    image: require("@/assets/images/was-it-helpful.png"),
    description: `Was it helpful?

    Join the Cosmic Loyalty Program today and start earning rewards for engaging with and promoting SMB DigitalZone!`,
  },
];

const HowItWorksScreen = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current?.next();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current?.prev();
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
        <View style={styles.containerCarousel}>
          <Carousel
            ref={carouselRef}
            width={width * 0.9}
            data={data}
            loop={false}
            pagingEnabled
            snapEnabled
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            renderItem={({ item }) => (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.card}>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </ScrollView>
            )}
          />

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={[styles.button, currentIndex === 0 && styles.disabled]}
            >
              <Icon name="caretleft" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={[
                styles.button,
                currentIndex === data.length - 1 && styles.disabled,
              ]}
            >
              <Icon name="caretright" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCarousel: {
    flexDirection: "column",
    height: "auto",
    maxHeight: 610,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    backgroundColor: "#0235B2",
    height: 59,
    width: 59,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#0235B2",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HowItWorksScreen;
