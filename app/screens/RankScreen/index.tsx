import Header from "@/components/ui/Header";
import { ranks } from "@/constants/contants";
import { RootStackParamList } from "@/types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

const RankScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LinearGradient
      colors={["rgb(52, 52, 52)", "rgba(0, 0, 0, 1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[1, 1, 0.3]}
      style={styles.container}
    >
      <ScrollView>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                margin: "auto",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Ranks
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("leaderboard")}
              >
                <Text style={{ color: "rgba(217,217,217,0.5)", fontSize: 13 }}>
                  Leaderboard
                </Text>
              </TouchableOpacity>
            </View>
            {ranks.map((item, index) => (
              <View key={index} style={styles.notificationItem}>
                <View>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.body}>{item?.totalReferrals}</Text>
                </View>
                <View>
                  <Image
                    style={{ resizeMode: "contain", width: 170, height: 100 }}
                    source={item.badgeIcon}
                    alt="Not found"
                  />
                </View>
              </View>
            ))}
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
    width: "90%",
    marginTop: 40,
  },
  notificationItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  body: {
    marginTop: 8,
    fontSize: 14,
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});

export default RankScreen;
