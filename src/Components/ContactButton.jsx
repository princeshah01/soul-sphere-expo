import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { Theme } from "../Constant/Theme";
const ContactButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 7,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Theme.light.border,
        backgroundColor: Theme.light.background,
        elevation: 3,
      }}
    >
      <Icon name={name} size={20} />
    </TouchableOpacity>
  );
};

export default ContactButton;

const styles = StyleSheet.create({});
