import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Theme } from "../../../../Constant/Theme";

const OnlineChatUser = ({ profilePicture, size = 72, online = true }) => {
  //   console.log("profile uri", profilePicture);

  return (
    <View style={{ width: size }}>
      <View
        style={{
          backgroundColor: Theme.primary,
          height: size,
          width: size,
          borderRadius: size / 2,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: profilePicture }}
          style={{
            borderRadius: size - 4 / 2,
            height: size - 4,
            width: size - 4,
            resizeMode: "cover",
          }}
        />
      </View>
      {online && (
        <View
          style={{
            borderRadius: 5,
            width: 10,
            height: 10,
            backgroundColor: "palegreen",
            position: "absolute",
            bottom: 8,
            right: 0,
          }}
        />
      )}
    </View>
  );
};

export default OnlineChatUser;

const styles = StyleSheet.create({});
