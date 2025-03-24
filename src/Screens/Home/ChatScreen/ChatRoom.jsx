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
