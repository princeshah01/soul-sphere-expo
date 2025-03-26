import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

const ChatRoom = ({ navigation, route }) => {
  const { SelectedChannel } = route?.params || {};

  console.log("ChatRoom received channel:", SelectedChannel);

  if (!SelectedChannel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No Channel Selected</Text>
      </View>
    );
  }

  return (
    <Channel channel={SelectedChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
