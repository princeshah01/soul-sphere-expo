import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../provider/DarkModeProvider";
import { Theme } from "../Constant/Theme";
const NoData = ({ msg, msg2, children }) => {
  const { isDark } = useDarkMode();
  return (
    <View
      style={{
        height: responsiveHeight(50),
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", gap: 10 }}>
        <LottieView
          source={require("../../assets/noData.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text style={[styles.msg, isDark && { color: Theme.dark.text }]}>
          {msg}
        </Text>
        <Text style={[styles.msg2, isDark && { color: Theme.dark.text }]}>
          {msg2}
        </Text>
        {children}
      </View>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  msg: {
    fontSize: responsiveFontSize(2),
    fontWeight: 500,
    color: Theme.light.text,
  },
  msg2: {
    width: responsiveWidth(60),
    fontSize: responsiveFontSize(1.8),
    textAlign: "center",
    opacity: 0.7,
    color: Theme.light.text,
  },
});
