import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { API } from "@/utils/api";

interface Notification {
  _id: string; // Example structure; adapt it to your backend response
  title: string | null;
  body: string | null;
  timestamp: string;
  isViewed: boolean;
  userId: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  saveDeviceToken: (expoPushToken: string) => Promise<void>;
  addNotification: (notification: Notification) => void;
  markAsViewed: (notificationId: string) => void;
  deleteNotification: (notificationId: string) => void;
  clearNotifications: () => void;
}

export const useNotificationsStore = create<NotificationState>((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    const { token } = useAuthStore.getState();
    if (token) {
      try {
        const response = await API.get(`/user/get-notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set({ notifications: response.data.data });
      } catch (error) {
        console.error("Fetch Notification Error: ", error);
      }
    }
  },
  markAsViewed: async (id) => {
    try {
      await API.put(`/user/notifications/${id}/view`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n._id === id ? { ...n, isViewed: true } : n
        ),
      }));
    } catch (error) {
      console.error("Error marking notification as viewed:", error);
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      await API.delete(`/user/notifications/${notificationId}`);
      set((state) => ({
        notifications: state.notifications.filter(
          (n) => n._id !== notificationId
        ),
      }));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },
  saveDeviceToken: async (expoPushToken) => {
    const { token } = useAuthStore.getState();
    try {
      if (token) {
        const response = await API.post(
          `/user/save-device-token`,
          {
            expoPushToken,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      // Assuming response.data contains an array of notifications
    } catch (error) {
      console.error("Saving Token Error: ", error);
    }
  },

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
