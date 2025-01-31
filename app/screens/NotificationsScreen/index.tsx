import Header from "@/components/ui/Header";
import { useNotificationsStore } from "@/store/notificationStore";
import { timeAgo } from "@/utils/globals";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

const NotificationsScreen = () => {
  const { notifications, fetchNotifications, markAsViewed } =
    useNotificationsStore();
  useEffect(() => {
    fetchNotifications();
  }, []);
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
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                flexDirection: "column",
                gap: 10,
              }}
            >
              {notifications.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => markAsViewed(item._id)}
                  style={styles.notificationItem}
                >
                  <Text style={styles.timestamp}>
                    {timeAgo(item?.createdAt as any)}
                  </Text>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.body}>{item?.body}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    {item.isViewed && (
                      <Text
                        style={{ color: "rgba(217,217,217,1)", fontSize: 12 }}
                      >
                        Viewed
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
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
    padding: 16,
    borderColor: "#ddd",
    borderRadius: 15,
    backgroundColor: "#fff",
    width: "90%",
    margin: "auto",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    marginTop: 8,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
});

export default NotificationsScreen;
