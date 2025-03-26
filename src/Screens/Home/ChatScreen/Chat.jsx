// import { StyleSheet, View, FlatList, Button } from "react-native";
// import React, { useCallback, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { ActivityIndicator } from "react-native-paper";
// import ChatUserCard from "./Components/ChatUserCard";
// import { Theme } from "../../../Constant/Theme";
// import { useDarkMode } from "../../../provider/DarkModeProvider";
// import { getChannelList } from "../../../service/ChatService.js";
// import { useFocusEffect } from "@react-navigation/native";
// const ChatScreen = () => {
//   const { isDark } = useDarkMode();
//   const navigation = useNavigation();
//   const { user } = useSelector((store) => store.Auth);
//   const { chatClient } = useSelector((store) => store.Chat);
//   const [privateChannelList, setPrivateChannelList] = useState();
//   useFocusEffect(
//     useCallback(() => {
//       const getChannels = async () => {
//         const channels = await getChannelList(user);
//         setPrivateChannelList(channels);
//       };
//       getChannels();
//     }, [chatClient])
//   );
//   const HandleSelect = (channel) => {
//     navigation.navigate("ChatRoom", { SelectedChannel: channel });
//   };
//   const getUserData = (item, loggedInuserId) => {
//     for (const key in item.state?.read) {
//       if (key !== loggedInuserId) {
//         return [
//           item.state?.read[key],
//           item?.state?.read[loggedInuserId]?.unread_messages,
//         ];
//       }
//     }
//   };

//   if (!privateChannelList) {
//     <ActivityIndicator />;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: isDark
//           ? Theme.dark.background
//           : Theme.light.background,
//       }}
//     >
//       <FlatList
//         data={privateChannelList}
//         renderItem={({ item }) => {
//           const [data, unread_messages] = getUserData(item, user._id);
//           return (
//             <ChatUserCard
//               onPress={() => {
//                 HandleSelect(item);
//               }}
//               item={data}
//               unread_messages={unread_messages}
//               messages={item?.state?.messageSets[0].messages}
//               isTyping={item?.isTyping}
//             />
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});

import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { ChannelList } from "stream-chat-expo";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import ChatProfileImage from "./Components/ChatProfileImage";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { getUserData } from "../../../service/ChatService";

const ChatScreen = ({ navigation }) => {
  const { user } = useSelector((store) => store.Auth);
  const { isDark } = useDarkMode();
  const HandleSelect = (channel) => {
    if (!channel) {
      console.error("Selected channel is undefined!");
      return;
    }
    console.log("Navigating to ChatRoom with channel:", channel);
    navigation.navigate("ChatRoom", { SelectedChannel: channel });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#FFFFFF" },
      ]}
    >
      <ChannelList
        key={isDark ? "dark" : "light"}
        PreviewAvatar={({ channel }) => {
          const data = getUserData(channel, user._id);
          console.log(data.user);
          return (
            <ChatProfileImage
              profilePicture={data.user.profileImage}
              online={data.user.online}
            />
          );
        }}
        PreviewTitle={({ channel }) => {
          const data = getUserData(channel, user._id);
          console.log(data.user);
          return (
            <Text style={[styles.name, isDark && styles.darkText]}>
              {data.user.name}
            </Text>
          );
        }}
        filters={{ type: "messaging", members: { $in: [user._id] } }}
        sort={{ last_message_at: -1 }}
        options={{ watch: true, state: true, presence: true, members: true }}
        onSelect={HandleSelect}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkText: {
    color: Theme.dark.text,
  },
  name: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: 600,
  },
});
