import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import React from "react";
import { Theme } from "../Constant/Theme";

const BackButton = ({ isDark, navigation, style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => navigation.pop()}
      style={[
        {
          backgroundColor: isDark
            ? Theme.dark.secondary
            : Theme.light.secondary,
        },
        styles.backBtn,
        style,
      ]}
    >
      <Icon
        name="left"
        size={24}
        color={isDark ? Theme.dark.text : Theme.light.text}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtn: {
    padding: 5,
    borderRadius: 12,
  },
});
