import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
const UserCardSimmer = () => {
  const { isDark } = useDarkMode();
  const shimmerColors = isDark ? Theme.dark.simmer : Theme.light.simmer;

  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        elevation: 3,
        height: responsiveHeight(9),
        width: responsiveWidth(90),
        overflow: "hidden",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: isDark ? Theme.dark.border : Theme.light.border,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShimmerPlaceholder
          autoRun
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={{
            width: "78%",
            height: "90%",
            borderRadius: 40,
          }}
        />
      </View>
      <View
        style={{
          flex: 3,
          gap: 10,
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <ShimmerPlaceholder
          autoRun
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={{ height: 18, width: "70%" }}
        />
        <ShimmerPlaceholder
          autoRun
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={{ height: 18, width: "20%" }}
        />
      </View>
    </View>
  );
};

export default UserCardSimmer;

const styles = StyleSheet.create({});
