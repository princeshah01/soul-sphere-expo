import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OverlayProvider,
  Chat,
  ChannelListLoadingIndicator,
} from "stream-chat-expo";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import ChatScreen from "../Screens/Home/ChatScreen/Chat";
import LoadingScreen from "../Components/ShimmerUI/LoadingScreen";
import connectUser from "../service/ChatService";
import { setClient } from "../Store/Slice/ChatSlice";
import { useDarkMode } from "../provider/DarkModeProvider";
import { getTheme } from "../Constant/Theme";

const CallRoom = () => <Text>Call</Text>;

const ChatStack = createStackNavigator();

const ChatNavigation = () => {
  const { isDark } = useDarkMode();

  const { token, user, chatToken } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.Chat);
  const { chatClient } = useSelector((store) => store.Chat);
  const [theme, setTheme] = useState(getTheme(isDark));

  useEffect(() => {
    setTheme(getTheme(isDark));
  }, [isDark]);

  useEffect(() => {
    let client;
    const connect = async () => {
      try {
        client = await connectUser(user, chatToken);
        dispatch(setClient({ chatClient: client }));
      } catch (error) {
        console.error("Stream Chat Connection Error:", error);
      }
    };

    connect();

    // return () => {
    //   if (chatClient) {
    //     console.log("Disconnecting Stream Chat...");
    //     client.disconnectUser();
    //   }
    // };
  }, []);

  if (isLoading || !chatClient) {
    return (
      <View
        style={{ flex: 1, justitifyContent: "center", alignItems: "center" }}
      >
        <LoadingScreen />
      </View>
    );
  }

  return (
    <OverlayProvider value={{ style: theme }}>
      <Chat client={chatClient}>
        <ChatStack.Navigator
          initialRouteName="Chat"
          screenOptions={{
            headerShown: false,
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
