import { StyleSheet, Image, View } from "react-native";
import React from "react";

const ChatProfileImage = ({ profilePicture, size = 60 }) => {
  return (
    <Image
      source={{ uri: profilePicture }}
      style={{
        borderRadius: size - 4 / 2,
        height: size - 4,
        width: size - 4,
        resizeMode: "cover",
      }}
    />
  );
};

export default ChatProfileImage;

const styles = StyleSheet.create({});
