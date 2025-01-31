import { create } from "zustand";
import * as SecureStore from "expo-secure-store"; // Expo Secure Store for mobile
import { Platform } from "react-native"; // To detect platform
import axios from "axios";
import { API } from "@/utils/api";

// Fallback for web: Check if `window` exists to ensure we're in the browser environment

const getFromStorage = async (key: string) => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key); // Use localStorage for web
    }
  } else {
    const value = await SecureStore.getItemAsync(key); // Use SecureStore for mobile
    return value ? JSON.parse(value) : null;
  }
};

const saveToStorage = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value); // Use localStorage for web
    }
  } else {
    await SecureStore.setItemAsync(key, value); // Use SecureStore for mobile
  }
};

const removeFromStorage = async (key: string) => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key); // Use localStorage for web
    }
  } else {
    await SecureStore.deleteItemAsync(key); // Use SecureStore for mobile
  }
};

interface AuthState {
  user: {
    _id: string;
    name: string;
    email: string;
    points: Number;
    referralCode: string;
    tierImage: string;
    profileImg: string;
    tier: string;
    isFirstLogin: boolean;
  } | null;
  token: string | null;
  email: string;
  welcomeMessage: string;
  error: string | null;
  setEmail: (email: string) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string, navigation: any) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    referralCode: string,
    navigation: any
  ) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  checkFirstLogin: (userId: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  email: "",
  welcomeMessage: "",
  error: null,
  setEmail: (email) => set({ email }),
  setError: (error) => set({ error }),

  initializeAuth: async () => {
    const user = await getFromStorage("user");
    const token = await getFromStorage("token");

    set({ user, token });
  },

  login: async (email, password, navigation) => {
    try {
      const response = await API.post(`/auth/login`, { email, password });

      const { user, token } = response.data;
      if (user) {
        try {
          // Store the first login check with the user ID
          const isFirstLogin = await SecureStore.getItemAsync(
            `isFirstLogin-${user._id}`
          );

          if (!isFirstLogin) {
            // First time login for this user
            await SecureStore.setItemAsync(`isFirstLogin-${user._id}`, "true");
            set({ welcomeMessage: "Welcome to our Loyalty App." });
          } else {
            set({ welcomeMessage: "Welcome back" });
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          set({ welcomeMessage: "Welcome!" });
        }
      }
      set({ user, token, error: null });
      await saveToStorage("user", JSON.stringify(user));
      await saveToStorage("token", token);
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigation.navigate("Otp-Verification");
      }
      set({ error: error.response?.data?.message || "Login Error" });
      console.error("Login Error: ", error);
    }
  },

  register: async (name, email, password, referralCode, navigation) => {
    try {
      const response = await API.post(`/auth/register`, {
        name,
        email,
        password,
        referralCode,
      }).then(() => {
        navigation.navigate("Otp-Verification");
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Register Error" });
      console.error("Register Error: ", error);
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await API.post(`/auth/verify-otp`, { email, otp });

      const { user, token } = response.data;

      set({ user, token, error: null });
      await saveToStorage("user", JSON.stringify(user));
      await saveToStorage("token", token);
    } catch (error: any) {
      set({ error: error.response?.data?.message || "OTP Verification Error" });
      console.error("OTP Verification Error: ", error);
    }
  },

  checkFirstLogin: async (userId) => {
    try {
      // Store the first login check with the user ID
      const isFirstLogin = await SecureStore.getItemAsync(
        `isFirstLogin-${userId}`
      );

      if (!isFirstLogin) {
        // First time login for this user
        await SecureStore.setItemAsync(`isFirstLogin-${userId}`, "true");
        set({ welcomeMessage: "Welcome to our Loyalty App." });
      } else {
        set({ welcomeMessage: "Welcome back" });
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      set({ welcomeMessage: "Welcome!" });
    }
  },
  logout: async () => {
    await removeFromStorage("user");
    await removeFromStorage("token");

    set({ user: null, token: null, email: "", error: null });
  },
}));

// Initialize authentication state
useAuthStore.getState().initializeAuth();
