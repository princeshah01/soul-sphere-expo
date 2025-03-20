import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../Screens/Home/ChatScreen/Chat";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import ProfileView from "../Screens/Home/ChatScreen/ProfileView";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatProvider from "../provider/ChatProvider";
const ChatStack = createStackNavigator();

const CallRoom = () => {
  return (
    <View>
      <Text>Coming Soon</Text>
    </View>
  );
};

const ChatNavigation = ({ navigation }) => {
  return (
    <ChatProvider>
      <ChatStack.Navigator
        initialRouteName="ChitChat"
        screenOptions={{ headerShown: false }}
      >
        <ChatStack.Screen name="ChitChat" component={Chat} />
        <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
        <ChatStack.Screen name="ProfileView" component={ProfileView} />
        <ChatStack.Screen name="call" component={CallRoom} />
      </ChatStack.Navigator>
    </ChatProvider>
  );
};

export default ChatNavigation;

const styles = StyleSheet.create({});
