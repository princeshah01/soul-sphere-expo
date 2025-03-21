// import React, { useContext, createContext, useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { StreamChat } from "stream-chat";
// import { useSelector } from "react-redux";
// import { OverlayProvider, Chat } from "stream-chat-expo";
// import { ActivityIndicator } from "react-native-paper";

// // const STREAM_API_KEY = "zz54h9m8vkys";
// const ChatContext = createContext({});

// const ChatProvider = ({ children }) => {
//   // we are creating a new object and returning that  this is not a good practice
//   const { token, user } = useSelector((store) => ({
//     token: store.Auth.token,
//     user: store.Auth.user,
//   }));

//   const [chatClient, setChatClient] = useState(true);
//   const [currentChannel, setCurrentChannel] = useState();

//   useEffect(() => {
//     const init = async () => {
//       if (!user || !token) {
//         console.warn("user or token is missing, cannot connect.");
//         return;
//       }

//       // try {
//       //   console.log("initializing");
//       //   const client = StreamChat.getInstance(STREAM_API_KEY, {
//       //     timeout: 6000,
//       //     enableWSFallback: true,
//       //   });

//       //   if (!client.user) {
//       //     await client.connectUser(
//       //       {
//       //         id: user._id,
//       //         name: user.fullName,
//       //         email: user.email,
//       //         image: user.profilePicture,
//       //       },
//       //       client.devToken(user._id)
//       //     );
//       //     console.log("Chat Connected");
//       //   }

//       //   const globalChat = client.channel("livestream", "globalChannel", {
//       //     name: "Global Chat",
//       //   });
//       //   await globalChat.watch();

//       //   setChatClient(client);
//       // } catch (error) {
//       //   console.error("connection error:", error.message);
//       // }
//     };

//     init();

//     return () => {
//       if (chatClient) {
//         chatClient.disconnectUser();
//         console.log("Stream Chat Disconnected");
//       }
//     };
//   }, [token, user]);

//   if (!chatClient) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         {/* <ActivityIndicator /> */}
//         <Text>Comming Soon</Text>
//       </View>
//     );
//   }

//   return (
//     <OverlayProvider>
//       {/* <Chat client={chatClient}> */}
//       <ChatContext.Provider
//         value={{ chatClient, currentChannel, setCurrentChannel }}
//       >
//         {children}
//       </ChatContext.Provider>
//       {/* </Chat> */}
//     </OverlayProvider>
//   );
// };

// export default ChatProvider;

// export const useChatContext = () => {
//   return useContext(ChatContext);
// };

// chatroom
// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Channel, MessageList, MessageInput } from "stream-chat-expo";
// import { useChatContext } from "../../../provider/ChatProvider";

// const ChatRoom = () => {
//   const { currentChannel } = useChatContext();
//   return (
//     <></>
//     // <Channel channel={currentChannel}>
//     //   <MessageList />
//     //   <MessageInput />
//     // </Channel>
//   );
// };

// export default ChatRoom;

// const styles = StyleSheet.create({});

// chat
// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { useChatContext } from "../../../provider/ChatProvider";
// import { ChannelList } from "stream-chat-expo";
// import { useNavigation } from "@react-navigation/native";
// const Chat = () => {
//   const { setCurrentChannel } = useChatContext();
//   const navigation = useNavigation();
//   const onSelect = (channel) => {
//     console.log("selected");
//     setCurrentChannel(channel);
//     navigation.navigate("ChatRoom");
//   };
//   return <></>;
//   // return <ChannelList onSelect={onSelect} />;
// };

// export default Chat;

// const styles = StyleSheet.create({});
// // import { useSelector, useDispatch } from "react-redux";
// // const { name } = useSelector((store) => store.Chat.data);
