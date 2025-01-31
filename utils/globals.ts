import { UserProps } from "@/app/types/types";
import * as Clipboard from "expo-clipboard";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
export const handleCopyReferal = async (user: UserProps) => {
  if (user && user.referralCode) {
    await Clipboard.setStringAsync(user.referralCode);
  }
};

export const timeAgo = (timestamp: Timestamp) => {
  const now: any = new Date();
  const time: any = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  return time.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
