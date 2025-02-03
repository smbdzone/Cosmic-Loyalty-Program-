import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import RewardsFooter from "@/components/ui/RewardsFooter";
import { BarChart, LineChart } from "react-native-gifted-charts";
import Header from "@/components/ui/Header";
import PointsComponent from "@/components/ui/PointsComponent";
import { useMediaStore } from "@/store/uploadMediaStore";
import { useReferralStore } from "@/store/referalStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { useUserStore } from "@/store/userStore";

interface CustomTooltipProps {
  x: number;
  y: number;
  label: string;
  value: string;
}
const DashboardScreen = () => {
  const { user, fetchUserRedemptionsTotal, userRedemptionPoints } =
    useUserStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { images, fetchSubmissionHistory } = useMediaStore();
  const {
    referrals,
    fetchUserReferral,
    referralPoints,
    fetchUserReferralPoints,
    yAxisRange,
  } = useReferralStore();

  useEffect(() => {
    fetchUserReferral("week");
    fetchUserReferralPoints("month");
    fetchSubmissionHistory();
    fetchUserRedemptionsTotal();
  }, []);

  const CustomTooltip = ({ x, y, label, value }: CustomTooltipProps) => (
    <View style={[styles.tooltip, { left: x - 4, top: y - 70 }]}>
      <Text style={styles.tooltipLabel}>{label}</Text>
      <Text style={styles.tooltipValue}>{value}</Text>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <View>
                <Text style={styles.welcomeText}>Dashboard</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", alignItems: "flex-end", marginTop: -20 }}
            >
              <PointsComponent />
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 17,
                borderRadius: 15,
                height: 80,
                width: "35%",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "900" }}>
                Total Points Earned
              </Text>
              <Text style={{ fontSize: 18, marginTop: 2 }}>
                {user && user.points?.toString()}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 17,
                borderRadius: 15,
                height: 80,
                width: "35%",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "900" }}>
                Points Redeemed
              </Text>
              <Text style={{ fontSize: 18, marginTop: 2 }}>
                {userRedemptionPoints}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 17,
                borderRadius: 15,
                height: 80,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "900", width: 50 }}>
                Proof Pending
              </Text>
              <Text style={{ fontSize: 18 }}>
                {images.filter((item) => !item.isAproved).length}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: "85%",
              marginTop: 20,
              borderRadius: 20,
              paddingVertical: 20,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Points collected over time
            </Text>
            <LineChart
              color={"#0235B2"}
              // hideDataPoints
              // isAnimated
              animateOnDataChange
              animationDuration={1000}
              onDataChangeAnimationDuration={300}
              // initialSpacing={0}
              endSpacing={0}
              startFillColor="#0235B2"
              spacing={90}
              startOpacity={0.4}
              endFillColor1="#fff"
              areaChart
              yAxisColor="#fff"
              xAxisColor="#fff"
              yAxisLabelTexts={
                yAxisRange &&
                Array.from(
                  {
                    length:
                      (yAxisRange.max - yAxisRange.min) / yAxisRange.step + 1,
                  },
                  (_, i) => (yAxisRange.min + i * yAxisRange.step)?.toString()
                )
              }
              showDataPointOnFocus={true}
              showDataPointLabelOnFocus={true}
              showValuesAsDataPointsText={true}
              showStripOnFocus={true}
              showTextOnFocus={true}
              focusEnabled={true}
              yAxisTextStyle={{ color: "lightgray" }}
              xAxisLabelTextStyle={{ color: "lightgray" }}
              curved
              data={referralPoints}
              showDataPointsForMissingValues={true}
              maxValue={yAxisRange.max + 100}
              focusedCustomDataPoint={(tooltipData: any) => (
                <CustomTooltip
                  x={tooltipData.x}
                  y={tooltipData.y}
                  label={tooltipData.label}
                  value={tooltipData.value}
                />
              )}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: "85%",
              marginTop: 20,
              borderRadius: 20,
              paddingVertical: 20,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Referrals
            </Text>
            <BarChart
              frontColor={"#177AD5"}
              width={300}
              barWidth={32}
              spacing={30}
              yAxisColor="#fff"
              xAxisColor="#fff"
              yAxisTextStyle={{ color: "lightgray" }}
              xAxisLabelTextStyle={{ color: "lightgray" }}
              animationDuration={1000}
              endSpacing={0}
              data={referrals}
            />
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
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 4,
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
  tooltip: {
    position: "absolute",
    backgroundColor: "#0235B2",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltipLabel: {
    color: "white",
    fontWeight: "bold",
  },
  tooltipValue: {
    color: "white",
    fontSize: 12,
  },
});

export default DashboardScreen;
