import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { API } from "@/utils/api";

interface ReferralState {
  referrals: any[];
  referralPoints: any[];
  leaderboard: any[];
  yAxisRange: {
    min: any;
    max: any;
    step: any;
  };
  fetchReferralCode: () => Promise<void>;
  fetchUserReferral: (query: string) => Promise<void>;
  fetchUserReferralPoints: (query: string) => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
}

export const useReferralStore = create<ReferralState>((set) => ({
  referrals: [],
  leaderboard: [],
  yAxisRange: { min: 0, max: 0, step: 0 },
  referralPoints: [],
  fetchReferralCode: async () => {
    const { token } = useAuthStore.getState();
    try {
      const response = await API.get(`/referal/create-referal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { referalCode } = response.data;
      set({ referrals: referalCode });
    } catch (error) {
      console.error("Fetch Referral Code Error: ", error);
    }
  },
  fetchUserReferral: async (query) => {
    const { token } = useAuthStore.getState();
    try {
      const response = await API.get(
        `/referal/get-user-referals?period=${query}&year=2025&month=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;
      set({ referrals: data });
    } catch (error) {
      console.error("Fetch Referral Code Error: ", error);
    }
  },
  fetchUserReferralPoints: async (query) => {
    const { token } = useAuthStore.getState();
    try {
      const response = await API.get(
        `/referal/get-user-points-overtime?period=${query}&year=2025&month=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data, yAxisRange } = response.data;
      set({ referralPoints: data, yAxisRange: yAxisRange });
    } catch (error) {
      console.error("Fetch Referral Code Error: ", error);
    }
  },
  fetchLeaderboard: async () => {
    try {
      const response = await API.get(`/referal/leaderboard`);

      const { leaderboard } = response.data;
      set({ leaderboard });
    } catch (error) {
      console.error("Fetch Referral Code Error: ", error);
    }
  },
}));
