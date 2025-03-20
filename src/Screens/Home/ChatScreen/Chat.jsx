import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
const Chat = () => {
  const { name } = useSelector((store) => store.Chat.data);
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
