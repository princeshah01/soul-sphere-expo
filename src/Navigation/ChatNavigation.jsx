import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import ChatScreen from "../Screens/Home/ChatScreen/Chat";
import LoadingScreen from "../Components/ShimmerUI/LoadingScreen";
import connectUser from "../service/ChatService";
import { setClient } from "../Store/Slice/ChatSlice";
import { useDarkMode } from "../provider/DarkModeProvider";
import { Theme } from "../Constant/Theme";
const CallRoom = () => <Text>Call</Text>;

const ChatStack = createStackNavigator();

const ChatNavigation = () => {
  const { isDark } = useDarkMode();
  const getTheme = () => ({
    messageList: {
      container: {
        backgroundColor: "transparent",
      },
    },
    colors: {
      accent_blue: isDark ? "#89BFFF" : "#005FFF",
      accent_dark_blue: isDark ? "#809FFF" : "#005DFF",
      accent_error: isDark ? "#FF6B6B" : "#FF3842",
      accent_green: isDark ? "#33E085" : "#20E070",
      accent_info: isDark ? "#33FF99" : "#1FE06F",
      accent_red: isDark ? "#FF6666" : "#FF3742",

      bg_gradient_end: isDark ? "#1F222B" : "#F7F7F7",
      bg_gradient_start: isDark ? "#191A1F" : "#FCFCFC",
      bg_user: isDark ? "#222222" : "#F7F7F8",

      black: isDark ? "#F6F6F6" : "#000000",
      blue_alice: isDark ? "#333D5A" : "#E9F2FF",
      border: isDark ? "#1F222B" : "#EFEBEB",
      code_block: isDark ? "#444444" : "#DDDDDD",
      disabled: isDark ? "#666666" : "#B4BBBA",

      grey: isDark ? "#AAAAAA" : "#7A7A7A",
      grey_dark: isDark ? "#999CA5" : "#72767E",
      grey_gainsboro: isDark ? "#444444" : "#DBDBDB",
      grey_whisper: isDark ? "#333333" : "#ECEBEB",

      icon_background: isDark ? "#333333" : "#FFFFFF",
      label_bg_transparent: isDark ? "#FFFFFF33" : "#00000033",
      light_blue: isDark ? "#1E3A5F" : "#E0F0FF",
      light_gray: isDark ? "#444444" : "#E9EAED",

      modal_shadow: isDark ? "#000000CC" : "#00000099",
      overlay: isDark ? "#FFFFFFCC" : "#000000CC",
      shadow_icon: isDark ? "#FFFFFF40" : "#00000040",

      static_black: isDark ? "#FFFFFF" : "#000000",
      static_white: isDark ? "#000000" : "#FFFFFF",

      targetedMessageBackground: isDark ? "#302D22" : "#FBF4DD",

      text_high_emphasis: isDark ? "#F6F6F6" : "#080707",
      text_low_emphasis: isDark ? "#B3B3B3" : "#7E828B",

      transparent: "transparent",
      white: isDark ? "#000000" : "#FFFFFF",
      white_smoke: isDark ? "#1E1E1E" : "#F2F2F2",
      white_snow: isDark ? "#292929" : "#FCFCFC",
    },
  });
  const customTheme = {};
  const { token, user, chatToken } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.Chat);
  const { chatClient } = useSelector((store) => store.Chat);
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    setTheme(getTheme());
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

    return () => {
      if (chatClient) {
        console.log("Disconnecting Stream Chat...");
        client.disconnectUser();
      }
    };
  }, []);

  if (isLoading || !chatClient) {
    return <LoadingScreen />;
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
