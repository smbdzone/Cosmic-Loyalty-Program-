import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { API } from "@/utils/api";

interface mediaState {
  images: any[];
  uploadImages: (selectedImages: any[]) => Promise<void>;
  fetchSubmissionHistory: () => Promise<void>;
}

interface imageData {
  uri: string;
  name: string;
  type: string;
}

export const useMediaStore = create<mediaState>((set) => ({
  images: [],
  uploadImages: async (selectedImages) => {
    const { token } = useAuthStore.getState();
    try {
      const formData = new FormData();

      selectedImages.forEach((image) => {
        let localUri = image.uri;
        let filename = image.fileName ?? localUri.split("/").pop() ?? "🖼";
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const imageData: imageData = {
          uri: localUri,
          name: filename,
          type,
        };
        formData.append("files", imageData as any);
      });

      const response = await API.post(`/user/upload-screenshots`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      set({ images: response.data.files });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  },
  fetchSubmissionHistory: async () => {
    const { token } = useAuthStore.getState();
    const response = await API.get(`/user/get-submission-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ images: response.data.files });
  },
}));
