import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useUserStore } from "@/store/userStore";

interface PointsComponentProps {
  render?: boolean;
}
const PointsComponent = ({ render }: PointsComponentProps) => {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [render]);
  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.pointsContainer}>
      <Image
        source={require("@/assets/icon/star.png")}
        style={{ width: 22, height: 22 }}
      />
      <Text style={styles.pointsText}>{user?.points?.toString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  pointsText: {
    color: "#0235B2",
    fontSize: 18,
  },
});

export default PointsComponent;
