import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

const ChatRoom = ({ navigation, route }) => {
  const { SelectedChannel } = route?.params;
  console.log(SelectedChannel);
  return (
    <Channel channel={SelectedChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
