import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import Indicator from "./Indicator.jsx";
import CustomButton from "../CustomBotton.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const Footer = ({ currentIndex, data, flatListRef, onFinish }) => {
  const handleSkip = async () => {
    await AsyncStorage.setItem("alreadyLaunched", "true");
    onFinish();
  };
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      const nextOffset = nextIndex * width;
      flatListRef.current.scrollToOffset({
        offset: nextOffset,
        animated: true,
      });
    } else {
      handleSkip();
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.indicatorContainer}>
        {data.map((_, idx) => (
          <Indicator currentIndex={currentIndex} idx={idx} key={idx} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton name="Skip" outline={true} onPress={handleSkip} />
        <CustomButton
          name={currentIndex === data.length - 1 ? "Finish" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  footer: {
    height: height * 0.3,
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
