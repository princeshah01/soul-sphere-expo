import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../Screens/Home/ChatScreen/Chat";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useSelector } from "react-redux";

const theme = {
  colors: { black: "#000000" },
};

const ChatStack = createStackNavigator();

// ✅ Provide your Stream API Key
const STREAM_API_KEY = "4jkwpacebmuc"; // Replace with your actual API key

// ✅ Initialize StreamChat client
const chatClient = StreamChat.getInstance(STREAM_API_KEY);

const CallRoom = () => {
  return (
    <View>
      <Text>Coming Soon</Text>
    </View>
  );
};

const ChatNavigation = () => {
  const { token, user } = useSelector((store) => store.Auth);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  console.log("User:", user);
  console.log("Token:", token);

  useEffect(() => {
    if (!token || !user?._id) {
      console.log("❌ No token or user found!");
      return;
    }

    const connectUser = async () => {
      try {
        console.log("🔄 Connecting user:", user.id);

        await chatClient.connectUser(
          {
            id: user._id,
            name: user.fullName,
            image: user.profilePicture,
          },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdkY2Y4ZjU0ZDljMmJhNTNiODY3ZWFkIn0.IS_xC7LHiUqD9CxgZxUgHZJWgYWuqHcu9YPfwHSy2Ow" // 🔹 Use token from Redux, not hardcoded!
        );

        console.log("✅ User connected successfully!");
        setIsConnected(true);
      } catch (error) {
        console.error("❌ Error connecting user:", error);
        setError(error.message);
        setIsConnected(false);
      }
    };

    connectUser();

    return () => {
      console.log("🔌 Disconnecting user...");
      chatClient.disconnectUser();
    };
  }, [token, user]);

  if (error) {
    return <Text style={{ color: "red" }}>⚠️ Error: {error}</Text>;
  }

  if (!isConnected) {
    return <Text>Loading...</Text>;
  }

  return (
    <OverlayProvider value={{ style: theme }}>
      <Chat client={chatClient}>
        <ChatStack.Navigator
          initialRouteName="Chat"
          screenOptions={{
            headerStyle: {
              height: 60,
            },
          }}
        >
          <ChatStack.Screen name="Chat" component={ChatScreen} />
          <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
          <ChatStack.Screen name="Call" component={CallRoom} />
        </ChatStack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatNavigation;

const styles = StyleSheet.create({});
