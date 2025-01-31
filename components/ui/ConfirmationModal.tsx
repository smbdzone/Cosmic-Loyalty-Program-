import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import CustomButton from "./CustomButton";

const BottomSlideModal = ({
  isVisible,
  onClose,
  title,
  children,
  onConfirm,
}: {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
}) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current; // Start off-screen

  useEffect(() => {
    if (isVisible) {
      // Animate slide in when visible
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the top of the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate slide out when hidden
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height, // Slide off the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      animationType="none" // Custom animations used
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Dismiss on background touch */}
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          <View style={styles.content}>{children}</View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              alignItems: "center",
              margin: "auto",
              gap: 10,
            }}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <CustomButton title="Yes" onPress={onConfirm} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "70%",
    margin: "auto",
  },
  content: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 10,
    alignSelf: "center",
    width: "50%",
    borderWidth: 1,
    borderColor: "rgba(217,217,217,0.9)",
  },
  closeButtonText: {
    color: "rgba(217,217,217,1)",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BottomSlideModal;
