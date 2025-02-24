import Header from "@/components/ui/Header";
import { ranks } from "@/constants/contants";
import { useNotificationsStore } from "@/store/notificationStore";
import { useReferralStore } from "@/store/referalStore";
import { RootStackParamList } from "@/types/navigation";
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";

const LeaderboardScreen = () => {
  const { leaderboard, fetchLeaderboard } = useReferralStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    fetchLeaderboard();
  }, [navigation]);

  console.log(leaderboard);
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
          <View style={styles.notificationContainer}>
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 20,
                backgroundColor: "#fff",
                borderRadius: 20,
                flexDirection: "column",
                gap: 10,
              }}
            >
              {leaderboard.length === 0 ? (
                <View style={{ paddingHorizontal: 20 }}>
                  <Text>No Records found</Text>
                </View>
              ) : (
                leaderboard.map((user, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#fff",
                      width: "95%",
                      margin: "auto",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <View style={styles.notificationItem}>
                      <View>
                        <Image
                          style={{
                            resizeMode: "cover",
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                          }}
                          source={{ uri: user.profileImg }}
                        />
                      </View>
                      <View>
                        <Text style={styles.title}>{user?.name}</Text>
                        <Text style={styles.body}>
                          {user?.referralCount} Referrals
                        </Text>
                      </View>
                    </View>
                    <View>
                      {user?.rank ? (
                        <Image
                          style={{
                            resizeMode: "cover",
                            width: 50,
                            height: 50,
                            marginTop: 10,
                          }}
                          source={
                            ranks.find((rank) => rank.title === user.rank)
                              ?.badgeIcon
                          }
                        />
                      ) : (
                        <Image
                          style={{
                            resizeMode: "cover",
                            width: 50,
                            height: 50,
                            marginTop: 10,
                          }}
                          source={require("@/assets/icon/advocate-badge.png")}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
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
  },
  notificationItem: {
    // marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: "#ddd",
    borderRadius: 15,
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    marginTop: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});

export default LeaderboardScreen;



