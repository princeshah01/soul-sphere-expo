import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { getUserData } from "../../../service/ChatService";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import CustomEmptyState from "./Components/CustomEmptyState";
import BackButton from "../../../Components/BackButton";
import { getChannel } from "../../../service/ChatService";
import { ActivityIndicator } from "react-native-paper";

const ChatRoom = ({ navigation, route }) => {
  const { SelectedChannel } = route?.params || null;
  console.log(SelectedChannel);
  const { _id } = useSelector((store) => store.Auth.user);
  const { isDark } = useDarkMode();
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    const getChannelInfo = async () => {
      try {
        if (!SelectedChannel) {
          throw new Error("no channel found ");
        }
        const ch = await getChannel(SelectedChannel);
        setChannel(ch);
      } catch (err) {
        console.log(err);
      }
    };
    getChannelInfo();
  }, []);
  if (!channel) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const data = getUserData(channel, _id);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{ uri: data.user.profileImage }}
      >
        <Channel
          EmptyStateIndicator={CustomEmptyState}
          key={isDark ? "dark" : "light"}
          channel={channel}
        >
          <View style={styles.overlay}>
            <View style={styles.header}>
              <BackButton navigation={navigation} isDark={isDark} />
            </View>
            <MessageList
              key={isDark ? "dark" : "light"}
              style={{ backgroundColor: "transparent" }}
              contentContainerStyle={{ flexGrow: 1 }}
            />
            <MessageInput />
          </View>
        </Channel>
      </ImageBackground>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

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
  header: {
    padding: "20",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
