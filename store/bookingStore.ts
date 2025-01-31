import { create } from "zustand";
import * as SecureStore from "expo-secure-store"; // Expo Secure Store for mobile
import { Platform } from "react-native"; // To detect platform
import axios from "axios";
import { useAuthStore } from "./authStore";
import { UserProps } from "@/app/types/types";
import { API } from "@/utils/api";

interface BookingState {
  booking: {
    serviceName: string;
    pointsRedeemed: number;
  } | null;
  error: string | null;
  setError: (error: string | null) => void;
  createBooking: (
    serviceName: string,
    pointsRedeemed: number,
    servicePoints: number
  ) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  error: null,
  setError: (error) => set({ error }),

  createBooking: async (serviceName, pointsRedeemed, servicePoints) => {
    try {
      const { token } = useAuthStore.getState();
      const response = await API.post(
        `/user/book-service`,
        { serviceName, pointsRedeemed, servicePoints },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      set({ booking: data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching user" });
      console.error("Error fetching user: ", error);
    }
  },
}));
