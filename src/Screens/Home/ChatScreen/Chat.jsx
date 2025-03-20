import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useChatContext } from "../../../provider/ChatProvider";
import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
const Chat = () => {
  const { setCurrentChannel } = useChatContext();
  const navigation = useNavigation();
  const onSelect = (channel) => {
    console.log("selected");
    setCurrentChannel(channel);
    navigation.navigate("ChatRoom");
  };
  return <ChannelList onSelect={onSelect} />;
};

export default Chat;

const styles = StyleSheet.create({});
// import { useSelector, useDispatch } from "react-redux";
// const { name } = useSelector((store) => store.Chat.data);
