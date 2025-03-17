import React, { useState, useRef } from "react";
import { View, FlatList } from "react-native";
import Header from "./Header";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { Theme } from "../../Constant/Theme";
import pageData from "./pages/ProfileSetupPageData";
import FooterProfileSetup from "./FooterProfileSetup";

const ProfileSetup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { isDark } = useDarkMode();
  const [userInfo, setUserInfo] = useState({
    profilePicture: "",
    userName: "",
    fullName: "",
    email: "",
    dob: new Date().toDateString(),
    gender: "",
    bio: "",
    locationName: "",
    locationcoordiantes: {
      type: "Point",
      coordinates: [],
    },
    interest: [],
    twoBestPics: [],
    interestIn: "",
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <Header currentIndex={currentIndex} name="Profile Setup" />

      <FlatList
        ref={flatListRef}
        data={pageData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => `${item.id}_${index}`}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const Component = item;
          return (
            <Component
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              currentIndex={currentIndex}
            />
          );
        }}
      />

      <FooterProfileSetup
        currentIndex={currentIndex}
        data={pageData}
        flatListRef={flatListRef}
        userInfo={userInfo}
        setCurrentIndex={setCurrentIndex}
      />
    </View>
  );
};

export default ProfileSetup;
