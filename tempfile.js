import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../Screens/Home/ChatScreen/Chat";
import ChatRoom from "../Screens/Home/ChatScreen/ChatRoom";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useSelector } from "react-redux";
import { decode } from "base-64";
import { useFocusEffect } from "@react-navigation/native";
// const theme = {
//   colors: { black: "#000000" },
// };

const ChatStack = createStackNavigator();

const CallRoom = () => {
  return (
    <View>
      <Text>Coming Soon</Text>
    </View>
  );
};
const chatClient = StreamChat.getInstance("3nxbz29qa2ku", {
  timeout: 6000,
  enableWSFallback: true,
});

const ChatNavigation = () => {
  const { streamApiKey, chatToken } = useSelector((store) => store.Auth);
  const apikey = decode(streamApiKey).split("-")[0];
  console.log("🚀 ~ ChatNavigation ~ apikey:", apikey);

  const { token, user } = useSelector((store) => store.Auth);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  console.log("User:", user);
  console.log("Token:", token);

  useFocusEffect(
    useCallback(() => {
      if (!token || !user?._id) {
        console.log("❌ No token or user found!");
        return;
      }

      const connectUser = async () => {
        try {
          console.log("🔄 Connecting user:", user.id);

          await chatClient.connectUser(
            {
              id: user._id.toString(),
              name: user.fullName,
              image: user.profilePicture,
            },
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdkY2Y4ZjU0ZDljMmJhNTNiODY3ZWFkIn0.VumvZYQJAWgsl4gf6or0Vob2GL88X84FHp_27UJT-Es"
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
    }, [token, user])
  );

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



















/////    chat Room 




import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
// import { useChatContext } from "../../../provider/ChatProvider";

const ChatRoom = ({ navigation }) => {
  const { currentChannel } = useChatContext();
  console.log(currentChannel);
  useEffect(() => {
    navigation.setOptions({ title: currentChannel?._data?.name || "channel" });
  }, [currentChannel?._data?.name]);
  return (
    <Channel channel={currentChannel} audioRecordingEnabled>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const ChatRoom = () => {
//   return (
//     <View>
//       <Text>ChatRoom</Text>
//     </View>
//   );
// };

// export default ChatRoom;

// const styles = StyleSheet.create({});










/// chat 
import React, { useCallback, useState } from "react";
import { ChannelList } from "stream-chat-expo";
import { useSelector } from "react-redux";
import env from "../../../Constant/env";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { View, Text } from "react-native";
import { Theme } from "../../../Constant/Theme.js";

const Chat = () => {
  const { token } = useSelector((store) => store.Auth);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getData = async () => {
        try {
          const response = await axios.get(
            env.API_BASE_URL + "/user/channels",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200 && isActive) {
            setChannel(response?.data?.channels || []);
          }
        } catch (error) {
          console.log(error.response?.data || "Error fetching channels");
        } finally {
          if (isActive) setLoading(false);
        }
      };

      getData();

      return () => {
        isActive = false;
      };
    }, [token])
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (channel.length > 0) {
    console.log(
      "Channel ID:",
      channel[0]?.id,
      "Channel Name:",
      channel[0]?.name,
      "Members:",
      channel[0]?.members
    );
  }

  const filters =
    channel.length > 0 ? { id: { $in: channel.map((c) => c.id) } } : {};

  return (
    <View style={{ flex: 1, padding: 20, borderRadius: 30 }}>
      <ChannelList filters={filters} />
    </View>
  );
};

export default Chat;
