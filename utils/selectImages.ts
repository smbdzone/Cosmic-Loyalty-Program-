import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

/**
 * Utility function to open the image picker and allow image selection.
 * @param {number} selectionLimit - Maximum number of images to select (only works on iOS 14+ and compatible Android devices).
 * @returns {Promise<Array>} - Resolves with an array of selected image objects.
 */
export const selectImages = async (selectionLimit = 1, Alert: Alert) => {
  try {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access the media library is required!");
    }

    // Launch image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: selectionLimit > 1, // Enable multi-selection if supported
      selectionLimit: selectionLimit, // Limit the number of images (iOS 14+ and Android)
      quality: 1, // Image quality (1 is highest)
    });

    if (result.canceled) {
      console.log("Image picker was canceled");
    }

    // Return the selected images
    return result.assets; // Array of selected images
  } catch (error: any) {
    console.error("Error selecting images:", error.message);
    throw error;
  }
};
