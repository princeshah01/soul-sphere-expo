import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { ChannelList } from "stream-chat-expo";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import ChatProfileImage from "./Components/ChatProfileImage";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { getUserData } from "../../../service/ChatService";
import Header from "../../ProfileSetup/Header";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector((store) => store.Auth);
  const { isDark } = useDarkMode();
  const HandleSelect = (channel) => {
    if (!channel) {
      console.error("Selected channel is undefined!");
      return;
    }
    console.log("Navigating to ChatRoom with channel:", channel.id);
    navigation.navigate("ChatRoom", { SelectedChannel: channel.id });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "red" : "#FFFFFF" },
      ]}
    >
      <Header isLogout={false} height={5} name="Chats" />
      <ChannelList
        key={isDark ? "dark" : "light"}
        PreviewAvatar={({ channel }) => {
          const data = getUserData(channel, user._id);
          console.log(data.user);
          return (
            <ChatProfileImage
              profilePicture={data.user.profileImage}
              online={data.user.online}
            />
          );
        }}
        PreviewTitle={({ channel }) => {
          const data = getUserData(channel, user._id);
          console.log(data.user);
          return (
            <Text
              key={isDark ? "dark" : "light"}
              style={[styles.name, isDark && styles.darkText]}
            >
              {data.user.name}
            </Text>
          );
        }}
        filters={{ type: "messaging", members: { $in: [user._id] } }}
        sort={{ last_message_at: -1 }}
        options={{ watch: true, state: true, presence: true, members: true }}
        onSelect={HandleSelect}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkText: {
    color: Theme.dark.text,
  },
  name: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: 600,
  },
});
