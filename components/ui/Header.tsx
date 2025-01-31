import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  useNavigation,
  DrawerActions,
  NavigationProp,
  useNavigationState,
} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { useNotificationsStore } from "@/store/notificationStore";
import { RootStackParamList } from "@/types/navigation";
import { useUserStore } from "@/store/userStore";

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name; // Get the name of the current route
  });
  const { notifications, fetchNotifications } = useNotificationsStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
    fetchNotifications();
  }, []);

  return (
    <View style={styles.iconContainer}>
      {!["profile"].includes(currentRouteName) ? (
        <View style={!user?.profileImg && styles.avatar}>
          <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            {user?.profileImg ? (
              <ImageBackground
                resizeMode="cover"
                style={{ height: 50, width: 50 }}
                imageStyle={{ borderRadius: 50 }}
                source={{ uri: user?.profileImg }}
              ></ImageBackground>
            ) : (
              <Icon name="person" size={30} color="#0235B2" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconsBackground}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("@/assets/icon/arrow-left.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 10 }}>
        {["Submission-history", "notifications", "leaderboard"].includes(
          currentRouteName
        ) && (
          <View style={styles.iconsBackground}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("@/assets/icon/arrow-left.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
        {currentRouteName !== "notifications" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("notifications")}
            style={styles.iconsBackground}
          >
            {notifications.filter((notification) => !notification.isViewed)
              .length > 0 && (
              <Text
                style={{
                  position: "absolute",
                  fontSize: 16,
                  backgroundColor: "red",
                  color: "#fff",
                  borderRadius: 50,
                  width: 27,
                  height: 27,
                  left: -10,
                  top: -10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  textAlign: "center",
                  paddingRight: 2,
                }}
              >
                {
                  notifications.filter((notification) => !notification.isViewed)
                    .length
                }
              </Text>
            )}
            <Image
              source={require("@/assets/icon/notification.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {![
          "Submission-history",
          "profile",
          "notifications",
          "leaderboard",
        ].includes(currentRouteName) && (
          <View style={styles.iconsBackground}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image
                source={require("@/assets/icon/menu.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 80,
  },
  avatar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  iconsBackground: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    position: "relative",
  },
  icon: { width: 30, height: 30 },
});

export default Header;
