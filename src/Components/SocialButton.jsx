import React from "react";
import { TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Theme } from "../Constant/Theme";
const { width } = Dimensions.get("window");
const SocialButton = ({ name, color, isDark }) => {
  return (
    <TouchableOpacity
      style={[
        isDark
          ? {
              backgroundColor: Theme.dark.secondary,
              borderColor: Theme.dark.border,
            }
          : {
              backgroundColor: Theme.light.secondary,
              borderColor: Theme.light.border,
            },
        styles.btn,
      ]}
    >
      <Icon name={name} size={25} color={color} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.15,
    height: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SocialButton;
