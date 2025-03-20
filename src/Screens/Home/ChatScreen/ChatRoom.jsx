import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useChatContext } from "../../../provider/ChatProvider";

const ChatRoom = () => {
  const { currentChannel } = useChatContext();
  return (
    <Channel channel={currentChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
