import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen/index";
import OtpScreen from "./screens/Auth/OtpSecreen";
import { useAuthStore } from "@/store/authStore";
import CustomDrawerContent from "@/components/ui/CustomDrawerContent";
import { Alert, Image, Platform } from "react-native";
import RedemptionScreen from "./screens/RedemptionScreen";
import GetStartedScreen from "./screens/Auth/GetStartedScreen";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import * as Linking from "expo-linking";
import ProofSubmissionScreen from "./screens/ProofSubmissionScreen";
import SubmissionHistory from "./screens/SubmissionHistory";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { useNotificationsStore } from "@/store/notificationStore";
import * as Device from "expo-device";
import NotificationsScreen from "./screens/NotificationsScreen";
import Header from "@/components/ui/Header";
import ProfileScreen from "./screens/ProfileScreen";
import RankScreen from "./screens/RankScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import SupportScreen from "./screens/SupportScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const menuComponents = [
  {
    icon: require("@/assets/icon/home-icon.png"),
    name: "Home",
    component: HomeScreen,
  },
  {
    icon: require("@/assets/icon/redeem.png"),
    name: "Redeem your points",
    component: RedemptionScreen,
  },
  {
    icon: require("@/assets/icon/go-to-website.png"),
    name: "Go to our website",
    component: HomeScreen,
    action: () => Linking.openURL("https://smbdigitalzone.com"),
  },
  {
    icon: require("@/assets/icon/proof-submission.png"),
    name: "Proof Submission",
    component: ProofSubmissionScreen,
  },
  {
    icon: require("@/assets/icon/dashboard-icon.png"),
    name: "Dashboard",
    component: DashboardScreen,
  },
  {
    icon: require("@/assets/icon/rank-icon.png"),
    name: "SMB Ranking",
    component: RankScreen,
  },
  {
    icon: require("@/assets/icon/support-icon.png"),
    name: "Support",
    component: SupportScreen,
  },
  // {
  //   icon: require("@/assets/icon/setting.png"),
  //   name: "Settings",
  //   component: HomeScreen,
  // },
  {
    icon: require("@/assets/icon/logout.png"),
    name: "Log Out",
    component: HomeScreen,
  },
];
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerPosition: "right",
      drawerStyle: {
        width: 300,
        backgroundColor: "#000000",
      },
      drawerItemStyle: {
        marginVertical: -8, // Adjust this value to reduce the gap between items
      },
    }}
  >
    {menuComponents.map((item) => (
      <Drawer.Screen
        key={item.name}
        name={item.name}
        component={item.component}
        options={{
          headerShown: false,
          drawerLabelStyle: {
            fontSize: 16,
            color: "#fff",
            width: 200,
          },
          drawerActiveBackgroundColor: "transparent",

          drawerIcon: ({ focused, color, size }) => (
            <Image style={{ width: 20, height: 20 }} source={item.icon} />
          ),
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            if (item.name === "Log Out") {
              e.preventDefault();
              const { logout } = useAuthStore.getState();
              logout();
            }
            if (item.name === "Go to our website" && item.action) {
              item.action();
            }
          },
        })}
      />
    ))}
    {/* Add more screens to the drawer here */}
  </Drawer.Navigator>
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const user = useAuthStore((state) => state.user);
  const { fetchNotifications, saveDeviceToken } = useNotificationsStore();

  useEffect(() => {
    fetchNotifications();
    const requestPermissions = async () => {
      try {
        // Ensure this runs only on physical devices
        if (!Device.isDevice) {
          Alert.alert("Must use a physical device for push notifications.");
          return;
        }

        let finalStatus;
        // Request permissions
        if (Platform.OS === "ios") {
          const { status } = await Notifications.getPermissionsAsync();
          finalStatus = status;

          if (status !== "granted") {
            const { status: newStatus } =
              await Notifications.requestPermissionsAsync();
            finalStatus = newStatus;
          }

          if (finalStatus !== "granted") {
            Alert.alert("Notification permission is required!");
            return;
          }
        } else {
          const { status: androidStatus } =
            await Notifications.getPermissionsAsync();
          if (androidStatus !== "granted") {
            const { status: newAndroidStatus } =
              await Notifications.requestPermissionsAsync();
            finalStatus = newAndroidStatus;
          }
        }

        // Get Expo push token
        const token = await Notifications.getExpoPushTokenAsync();

        // Send the token to your backend
        try {
          // await fetchNotifications(token.data);
          await saveDeviceToken(token.data);
        } catch (error) {
          console.error("Error sending push token to backend:", error);
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    };

    requestPermissions();

    // Foreground notification listener
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        fetchNotifications();
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Drawer"
              component={DrawerNavigator}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Submission-history"
              component={SubmissionHistory}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="leaderboard"
              component={LeaderboardScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile"
              component={ProfileScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Get Started"
              component={GetStartedScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Otp-Verification"
              component={OtpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
