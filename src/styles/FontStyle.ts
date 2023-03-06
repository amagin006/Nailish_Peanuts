import { Platform } from "react-native";

export const FONT_SIZE = {
  BIG_XL: 34,
  BIG: 24,
  LITTLE_BIG: 22,
  MEDIUM: 20,
  LITTLE_MEDIUM: 18,
  NORMAL: 16,
  LITTLE_NORMAL: 14,
  THIN: 12,
  LITTLE_THIN: 10,
  SMALL: 8,
};

//TODO: Change font family
export const FONT_FAMILY = {
  FONT_REGULAR: Platform.OS === "ios" ? "Arial" : "sans-serif",
  FONT_MEDIUM: Platform.OS === "ios" ? "Arial" : "sans-serif",
  FONT_BOLD: Platform.OS === "ios" ? "Arial" : "sans-serif",
  FONT_ITALIC: Platform.OS === "ios" ? "Arial" : "sans-serif",
};
