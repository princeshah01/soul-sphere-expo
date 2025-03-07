import React from "react";
import { Text, View } from "react-native";
import Logo from "../../Components/Logo";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { Theme } from "../../Constant/Theme";
import Logout from "../../Components/LogoutButton";

const ProfileSetupHeader = ({ currentIndex, name }) => {
  const { isDark } = useDarkMode();
  return (
    <View
      style={{
        gap: 20,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        height: responsiveHeight(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Logo size={responsiveFontSize(4)} />
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              fontWeight: 600,
              color: isDark ? Theme.dark.text : Theme.light.text,
            }}
          >
            {name}
          </Text>
        </View>
        <Logout />
      </View>
      {name === "Profile Setup" && (
        <View
          style={{
            alignSelf: "center",
            width: responsiveWidth(90),
            borderRadius: 10,
            height: responsiveHeight(0.5),
            backgroundColor: Theme.dark.secondary,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: Theme.primary,
              width: `${33.3 * (currentIndex + 1)}%`,
              height: "100%",
            }}
          ></View>
        </View>
      )}
    </View>
  );
};

export default ProfileSetupHeader;
