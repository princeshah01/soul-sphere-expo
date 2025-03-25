import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { StreamChat } from "stream-chat";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import ChatScreen from "../Screens/Home/ChatScreen/Chat";
import LoadingScreen from "../Components/ShimmerUI/LoadingScreen";
let CallRoom = () => {
  return <Text>Call</Text>;
};

let client = StreamChat.getInstance("3nxbz29qa2ku");
let ChatStack = createStackNavigator();

const ChatNavigation = () => {
  const { chatToken, token, user } = useSelector((store) => store.Auth);
  const [isConnected, setIsConnected] = useState(false);
  const getUserConnected = async () => {
    setIsConnected(false);
    try {
      if (!token && !user) {
        throw new Error("no token and user found");
      }
      console.log(client);
      await client.connectUser(
        {
          id: user._id,
          name: user.fullName,
          email: user.email,
        },
        chatToken
      );
      console.log("connected done");
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserConnected();
    return () => {
      console.log("disconnected");
      client.disconnectUser();
    };
  }, [token, user]);

  return !isConnected ? (
    <LoadingScreen />
  ) : (
    <OverlayProvider>
      <Chat client={client}>
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
