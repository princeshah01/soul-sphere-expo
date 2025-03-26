import { StyleSheet, Image, View } from "react-native";
import React from "react";

const ChatProfileImage = ({ profilePicture, size = 60, online }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri: profilePicture }}
        style={{
          borderRadius: size - 4 / 2,
          height: size - 4,
          width: size - 4,
          resizeMode: "cover",
        }}
      />
      {online && (
        <View
          style={{
            backgroundColor: "green",
            width: size * 0.2,
            height: size * 0.2,
            position: "absolute",
            bottom: 10,
            right: 2,
            borderRadius: size * 0.5,
          }}
        />
      )}
    </View>
  );
};

export default ChatProfileImage;

const styles = StyleSheet.create({});
