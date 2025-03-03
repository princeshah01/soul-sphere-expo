import { FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { onboardingData } from "../../Constant/OnBoardData.js";
import Slide from "../../Components/OnBoard/Slide.jsx";
import Footer from "../../Components/OnBoard/Footer.jsx";
import { useDarkMode } from "../../provider/DarkModeProvider.jsx";
import { Theme } from "../../Constant/Theme.js";
const { width } = Dimensions.get("window");

const OnboardScreen = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { isDark } = useDarkMode();
  console.log(isDark);
  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: "white" },
        isDark && { backgroundColor: Theme.dark.background },
      ]}
    >
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={onboardingData}
        renderItem={({ item }) => <Slide isDark={isDark} item={item} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / width);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={32}
      />
      <Footer
        currentIndex={currentIndex}
        data={onboardingData}
        flatListRef={flatListRef}
        onFinish={onFinish}
      />
    </SafeAreaView>
  );
};

export default OnboardScreen;
