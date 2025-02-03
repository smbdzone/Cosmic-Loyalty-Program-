import { create } from "zustand";
import * as SecureStore from "expo-secure-store"; // Expo Secure Store for mobile
import { Platform } from "react-native"; // To detect platform
import axios from "axios";
import { useAuthStore } from "./authStore";
import { UserProps } from "@/app/types/types";
import { API } from "@/utils/api";

// Fallback for web: Check if `window` exists to ensure we're in the browser environment
interface UserState {
  user: UserProps | null;
  error: string | null;
  setError: (error: string | null) => void;
  fetchUser: () => Promise<void>;
  updateProfileImg: (image: File) => Promise<void>;
  updateUser: (name: string, password: string) => Promise<void>;
  fetchUserRedemptionsTotal: () => Promise<void>;
  userRedemptionPoints: number;
}

interface imageData {
  uri: string;
  name: string;
  type: string;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  error: null,
  userRedemptionPoints: 0,
  setError: (error) => set({ error }),

  fetchUser: async () => {
    try {
      const { token } = useAuthStore.getState();
      const response = await API.get(`/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      set({ user: data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching user" });
      console.error("Error fetching user: ", error);
    }
  },
  updateUser: async (name, password) => {
    try {
      const { token } = useAuthStore.getState();

      // Combine the updated user data with the new profile image URL (if any)
      const payload = {
        name,
        password,
      };

      // Send the update request to the backend
      const response = await API.put(`/user/update-user`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the user state with the updated data
      const { data } = response.data;
      set({ user: data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error updating user" });
      console.error("Error updating user: ", error);
    }
  },
  updateProfileImg: async (profileImgFile: any) => {
    try {
      const { token } = useAuthStore.getState();

      // If there's a profile image file, upload it to Cloudinary first
      let localUri = profileImgFile.uri;
      let filename =
        profileImgFile.fileName ?? localUri.split("/").pop() ?? "🖼";
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const imageData: imageData = {
        uri: localUri,
        name: filename,
        type,
      };
      if (profileImgFile) {
        const formData = new FormData();
        formData.append("profileImg", imageData as any);

        const uploadResponse = await API.put(
          `/user/update-user-profile-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { data } = uploadResponse.data; // URL of the uploaded image
        set({ user: data });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error updating user" });
      console.error("Error updating user: ", error);
    }
  },
  fetchUserRedemptionsTotal: async () => {
    try {
      const { token } = useAuthStore.getState();
      const response = await API.get(`/user/get-redemptions-total`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { totalPoints } = response.data;
      set({ userRedemptionPoints: totalPoints });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching user" });
      console.error("Error fetching user: ", error);
    }
  },
}));

// Initialize authentication state
// useUserStore.getState().initializeAuth();
