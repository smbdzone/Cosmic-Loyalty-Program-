import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { ReactNode } from "react";

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.content}>{children}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={22} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    right: 5,
    top: 6,
  },
  closeButtonText: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default Popup;
