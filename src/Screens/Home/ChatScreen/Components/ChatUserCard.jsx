import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OnlineChatUser from "./OnlineChatUser";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ChatCard = ({ data }) => {
  //   console.log("🚀 ~ ChatCard ~ data:", data);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "18%" }}>
        <OnlineChatUser
          size={56}
          profilePicture={data.profilePicture}
          online={data.online}
        />
      </View>
      <View style={{ width: "82%", justifyContent: "center", gap: 4 }}>
        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 500 }}>
          {data.fullName}
        </Text>
        <Text>
          {data.Messages
            ? data.Messages
            : "No messages yet. Start the conversation! 💬"}
        </Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({});
