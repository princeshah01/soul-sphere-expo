import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme } from "../Constant/Theme";
import { useDarkMode } from "../provider/DarkModeProvider";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGes,
} from "react-native-reanimated";

const RangeSlider = () => {
  const { isDark } = useDarkMode();
  return (
    <View style={styles.sliderContainer}>
      <View
        style={[
          styles.sliderBack,
          { backgroundColor: isDark ? Theme.dark.border : Theme.light.border },
        ]}
      ></View>
      <View style={styles.sliderFront}>
        <View style={[styles.thumb, styles.thumbLeft]}>
          <View style={styles.label}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 600,
                color: isDark ? Theme.dark.background : Theme.light.background,
              }}
            >
              10
            </Text>
          </View>
        </View>
        <View style={[styles.thumb, styles.thumbRight]}>
          <View style={styles.label}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 600,
                color: isDark ? Theme.dark.background : Theme.light.background,
              }}
            >
              50
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  sliderBack: {
    height: 5,
    width: "100%",
    borderRadius: 10,
  },
  sliderFront: {
    backgroundColor: Theme.primary,
    height: 5,
    width: "60%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    position: "absolute",
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: Theme.light.background,
    borderColor: Theme.primary,
  },
  thumbLeft: {
    left: 0,
  },
  thumbRight: {
    right: 0,
  },
  label: {
    position: "relative",
    width: 30,
    height: 20,
    alignItems: "center",
    backgroundColor: Theme.primary,
    bottom: 30,
    right: 8,
    borderRadius: 5,
  },
});
