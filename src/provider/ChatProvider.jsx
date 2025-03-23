import React, { useContext, createContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StreamChat } from "stream-chat";
import { useSelector } from "react-redux";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { ActivityIndicator } from "react-native-paper";

const STREAM_API_KEY = "zz54h9m8vkys";
const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
  const { token, user } = useSelector((store) => ({
    token: store.Auth.token,
    user: store.Auth.user,
  }));

  const [chatClient, setChatClient] = useState(null);
  const [currentChannel, setCurrentChannel] = useState();

  useEffect(() => {
    const init = async () => {
      if (!user || !token) {
        console.warn("user or token is missing, cannot connect.");
        return;
      }

      try {
        console.log("initializing");
        const client = StreamChat.getInstance(STREAM_API_KEY, {
          timeout: 6000,
          enableWSFallback: true,
        });

        if (!client.user) {
          await client.connectUser(
            {
              id: user._id,
              name: user.fullName,
              email: user.email,
              image: user.profilePicture,
            },
            client.devToken(user._id)
          );
          console.log("Chat Connected");
        }

        const globalChat = client.channel("livestream", "globalChannel", {
          name: "Global Chat",
        });
        await globalChat.watch();

        setChatClient(client);
      } catch (error) {
        console.error("connection error:", error.message);
      }
    };

    init();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
        console.log("Stream Chat Disconnected");
      }
    };
  }, [token, user]);

  if (!chatClient) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider
          value={{ chatClient, currentChannel, setCurrentChannel }}
        >
          {children}
        </ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
