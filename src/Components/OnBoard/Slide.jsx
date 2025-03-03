import { StyleSheet, Text, Image, View, Dimensions } from "react-native";
import React from "react";
import { Theme } from "../../Constant/Theme";
const { width, height } = Dimensions.get("window");
const Slide = ({ item, isDark }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.title, isDark && { color: Theme.dark.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.description, isDark && { color: Theme.dark.text }]}>
        {item.description}
      </Text>
    </View>
  );
};
export default Slide;

const styles = StyleSheet.create({
  slide: {
    width: width,
    alignItems: "center",
    height: height * 0.7,
  },
  image: {
    width: width * 0.9,
    resizeMode: "contain",
    height: height * 0.6,
    marginTop: -height * 0.08,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: -height * 0.1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 18,
    opacity: 0.7,
  },
});
