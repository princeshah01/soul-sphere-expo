import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { getUserData } from "../../../service/ChatService";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import { BlurView } from "expo-blur";
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  };
}
const ChatRoom = ({ navigation, route }) => {
  const { SelectedChannel } = route?.params || {};
  const { _id } = useSelector((store) => store.Auth.user);
  const { isDark } = useDarkMode();

  // console.log(
  //   "ChatRoom received channel:",
  //   JSON.stringify(SelectedChannel, getCircularReplacer(), 2)
  // );
  console.log(SelectedChannel.state.read);
  const data = getUserData(SelectedChannel, _id);
  if (!SelectedChannel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No Channel Selected</Text>
      </View>
    );
  }

  return (
    <Channel key={isDark ? "dark" : "light"} channel={SelectedChannel}>
      <ImageBackground
        style={{ flex: 1, resizeMode: "cover" }}
        source={{
          uri: data.user.profileImage,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <MessageList key={isDark ? "dark" : "light"} />
          <MessageInput />
        </View>
      </ImageBackground>
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
