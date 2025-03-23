import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
const SearchLoading = () => {
  const { isDark } = useDarkMode();
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      shimmerColors={isDark ? Theme.dark.simmer : Theme.light.simmer}
      autoRun
      style={{
        width: responsiveWidth(80),
        height: 40,
        borderRadius: 20,
      }}
    />
  );
};

export default SearchLoading;

const styles = StyleSheet.create({});
