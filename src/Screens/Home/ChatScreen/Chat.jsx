import { StyleSheet, View } from "react-native";
import React from "react";
import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const ChatScreen = () => {
  const navigation = useNavigation();
  const HandleSelect = (channel) => {
    console.log("selected1");
    navigation.navigate("ChatRoom", { SelectedChannel: channel });
  };
  const { user } = useSelector((store) => store.Auth);
  return (
    <View style={{ flex: 1 }}>
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user._id] },
        }}
        sort={{ last_message_at: -1 }}
        options={{ watch: true, state: true, presence: true, members: true }}
        onSelect={HandleSelect}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
