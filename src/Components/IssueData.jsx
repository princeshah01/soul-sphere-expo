import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../provider/DarkModeProvider";
import { Theme } from "../Constant/Theme";

const IssueData = ({ data }) => {
  const { message, issueType, status, createdAt } = data;
  const { isDark } = useDarkMode();
  const date = new Date(createdAt).toDateString();

  return (
    <View
      style={[
        styles.container,
        isDark && {
          borderColor: Theme.dark.border,
          backgroundColor: Theme.dark.background,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={[
            styles.textLight,
            isDark && styles.textDark,
            { fontWeight: 600, fontSize: responsiveFontSize(2) },
          ]}
        >
          {issueType}
        </Text>
        <Text
          style={[
            styles.textLight,
            isDark && styles.textDark,
            {
              color: status !== "Resolved" ? Theme.warning : Theme.success,
              borderWidth: 1,
              paddingVertical: 2,
              paddingHorizontal: 8,
              borderColor:
                status !== "Resolved" ? Theme.warning : Theme.success,
              borderRadius: 10,
              //   fontWeight: 600,
            },
          ]}
        >
          {status}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        style={[styles.textLight, isDark && styles.textDark, { opacity: 0.8 }]}
      >
        {message}
      </Text>
      <Text
        style={[
          styles.textLight,
          isDark && styles.textDark,
          { opacity: 0.7, fontSize: responsiveFontSize(1.3) },
        ]}
      >
        IssueRaised on : {date}
      </Text>
    </View>
  );
};

export default IssueData;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: responsiveHeight(2),
    borderColor: Theme.light.border,
    backgroundColor: Theme.light.background,
    elevation: 3,
  },
  textLight: {
    color: Theme.light.text,
  },
  textDark: {
    color: Theme.dark.text,
  },
});
