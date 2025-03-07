import React, { useState, useRef } from "react";
import { View, FlatList } from "react-native";
import ProfileSetupHeader from "./ProfileSetupHeader";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { Theme } from "../../Constant/Theme";
import pageData from "./pages/ProfileSetupPageData";
import { responsiveWidth } from "react-native-responsive-dimensions";
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
      <ProfileSetupHeader currentIndex={currentIndex} />
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={pageData}
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
        keyExtractor={(item, index) => `${item.id}_${index}`}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / responsiveWidth(100));
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={32}
      />
      <FooterProfileSetup
        currentIndex={currentIndex}
        data={pageData}
        flatListRef={flatListRef}
        userInfo={userInfo}
      />
    </View>
  );
};

export default ProfileSetup;
