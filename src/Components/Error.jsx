import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../provider/DarkModeProvider";
import { Theme } from "../Constant/Theme";
const Error = ({ errorMsg }) => {
  const { isDark } = useDarkMode();

  return (
    <View
      style={{
        height: responsiveHeight(60),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={{ uri: "https://cdn.lottielab.com/l/DyTxLgr23NydNm.json" }}
        autoPlay
        loop
        style={{ width: responsiveWidth(80), height: responsiveHeight(40) }}
      />
      <Text
        style={{
          fontSize: responsiveFontSize(2),
          fontWeight: 500,
          color: isDark ? Theme.dark.text : Theme.light.text,
        }}
      >
        {errorMsg}
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
