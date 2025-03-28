import { Theme } from "../../../Constant/Theme";
import { View, TextInput, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CustomGenderDrop from "../../../Components/ProfileSetup/CustomGenderDrop";
import ProfileImage from "../../../Components/ProfileSetup/ProfileImage";
import CustomDatePicker from "../../../Components/ProfileSetup/CustomDatePicker";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import CustomInput from "../../../Components/ProfileSetup/CustomInput";
import { useSelector } from "react-redux";

const ProfileSetupPage1 = ({ userInfo, setUserInfo, currentIndex }) => {
  const { fullName, email, userName } = useSelector((store) => store.Auth.user);
  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      fullName: fullName,
      email: email,
      userName: userName,
    }));
  }, []);

  const { isDark } = useDarkMode();

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        padding: 15,
        width: responsiveWidth(100),
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <ProfileImage
          profilePicture={userInfo.profilePicture}
          setProfilePicture={(value) =>
            setUserInfo((prev) => ({ ...prev, profilePicture: value }))
          }
          disabled={false}
          size={150}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            color: isDark ? Theme.dark.text : Theme.light.text,
            fontWeight: 500,
            opacity: 0.8,
          }}
        >
          {fullName}
        </Text>
        <CustomInput iconName="mail" name="Email" value={email} />
        <CustomDatePicker
          value={userInfo.dob}
          setValue={(value) => setUserInfo((prev) => ({ ...prev, dob: value }))}
          editable={true}
        />
        <CustomGenderDrop
          Gender={userInfo.gender}
          setGender={(value) =>
            setUserInfo((prev) => ({ ...prev, gender: value }))
          }
          editable={true}
        />
        <View
          style={[
            styles.Bio,
            isDark && {
              backgroundColor: Theme.dark.background,
              borderColor: Theme.dark.border,
              color: Theme.dark.text,
            },
          ]}
        >
          <TextInput
            value={userInfo.bio}
            onChangeText={(value) =>
              setUserInfo((prev) => ({ ...prev, bio: value }))
            }
            placeholder="Enter about yourself..."
            maxLength={50}
            placeholderTextColor={
              isDark ? Theme.dark.text + "66" : Theme.light.text + "66"
            }
            multiline={true}
            numberOfLines={4}
            style={{
              fontSize: responsiveFontSize(2),
              opacity: 0.9,
              fontWeight: 600,
              color: isDark ? Theme.dark.text : Theme.light.text,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  Bio: {
    marginTop: -13,
    borderWidth: 1,
    alignSelf: "center",
    width: responsiveWidth(75),
    borderRadius: 10,
    textAlignVertical: "top",
    height: responsiveHeight(10),
    elevation: 5,
    paddingHorizontal: 5,
    backgroundColor: Theme.light.background,
    borderColor: Theme.light.border,
  },
});

export default ProfileSetupPage1;
