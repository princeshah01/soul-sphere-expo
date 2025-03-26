import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ChatProfileImage from "./ChatProfileImage";
import { Theme } from "../../../../Constant/Theme";
import { useDarkMode } from "../../../../provider/DarkModeProvider";
import Icon from "@expo/vector-icons/AntDesign";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const ChatUserCard = ({
  item,
  onPress,
  messages,
  isTyping,
  unread_messages,
}) => {
  const { isDark } = useDarkMode();

  const last_message = messages[messages.length - 1].text;
  const isMsgSeen = item.unread_messages;
  const { user } = item;
  const { profileImage, name, online, last_active } = user;

  console.log(last_active);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.mainContainer,
        isDark && { borderBottomColor: Theme.dark.border },
      ]}
    >
      <ChatProfileImage profilePicture={profileImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, isDark && styles.darkText]}>{name}</Text>
        {!isTyping ? (
          <View style={styles.text}>
            <Text
              style={[
                styles.lastmessage,
                unread_messages && styles.unreadmessage,
                isDark && styles.darkText,
              ]}
            >
              {last_message}
            </Text>
            {unread_messages && (
              <View style={styles.unreadbadge}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: Theme.light.background,
                  }}
                >
                  {unread_messages}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <Text>typing...</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ color: isDark ? Theme.dark.text : Theme.light.text }}>
          {new Date(last_active).toLocaleDateString()}
        </Text>
        {isMsgSeen ? (
          <Icon
            name="checkcircleo"
            size={15}
            color={isDark ? Theme.dark.text : Theme.light.text}
          />
        ) : (
          <ChatProfileImage size={22} profilePicture={profileImage} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatUserCard;

const styles = StyleSheet.create({
  infoContainer: {
    width: "20%",
    height: "100%",
    gap: 15,
    alignItems: "flex-end",
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderBottomColor: Theme.light.border,
    borderBottomWidth: 1,
    gap: 10,
  },
  textContainer: {
    height: "100%",
    width: "60%",
    gap: 10,
  },
  name: {
    fontSize: responsiveFontSize(2.1),
    letterSpacing: 1.05,
    fontWeight: 600,
  },
  lastmessage: {
    letterSpacing: 1.1,
  },
  unreadmessage: {
    fontWeight: 700,
  },
  text: {
    flexDirection: "row",
    gap: 10,
  },
  unreadbadge: {
    borderRadius: 10,
    width: 16,
    height: 16,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  darkText: {
    color: Theme.dark.text,
  },
});
