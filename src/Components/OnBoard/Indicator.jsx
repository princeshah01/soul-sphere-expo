import { StyleSheet, View } from "react-native";
import React from "react";

const Indicator = ({ currentIndex, idx }) => (
  <View
    style={[
      styles.indicator,
      currentIndex === idx ? styles.activeIndicator : styles.inactiveIndicator,
    ]}
  />
);

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    height: 6,
    borderRadius: 3,
  },

  activeIndicator: {
    backgroundColor: "#a83ef5",
    width: 16,
  },
  inactiveIndicator: {
    backgroundColor: "#EFF3EA",
    width: 8,
  },
});
