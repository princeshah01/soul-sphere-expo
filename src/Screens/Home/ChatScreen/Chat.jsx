import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import Header from "../../ProfileSetup/Header";
import OnlineChatUser from "./Components/OnlineChatUser";
import { getChatList } from "../../../Store/Slice/Chat";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import ChatCard from "./Components/ChatUserCard";
import { useSelector, useDispatch } from "react-redux";

const Chat = () => {
  const { data } = useSelector((store) => store.Connection);
  const { ChatList, isLoading, isError } = useSelector((store) => store.Chat);
  const { token } = useSelector((store) => store.Auth);
  const { isDark } = useDarkMode();
  // console.log("🚀 ~ Chat ~ ChatList:", ChatList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatList(token));
  }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <Header isLogout={false} name="Chat" height={5} />
      <View style={styles.mainContainer}>
        {/* <Text>Active Users</Text> */}
        <View style={{ borderBottomWidth: 1, borderColor: "lightgray" }}>
          {data.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.onlineContainer}
              data={data}
              renderItem={({ item }) => {
                // console.log("🚀 ~ Chat ~ item:", item.userInfo);
                return (
                  <OnlineChatUser
                    profilePicture={item.userInfo.profilePicture}
                  />
                );
              }}
            />
          ) : (
            <Text>no matches found</Text>
          )}
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.userContainer}
            data={ChatList}
            renderItem={({ item }) => {
              return <ChatCard data={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    width: responsiveWidth(90),
    height: responsiveHeight(87),
  },
  onlineContainer: {
    alignItems: "center",
    gap: 10,
    width: responsiveWidth(100),
    height: responsiveHeight(10),
  },
  userContainer: {
    paddingVertical: 16,
    width: "100%",
    height: responsiveHeight(77),
    gap: 16,
  },
});
