import { Theme } from "../../../Constant/Theme";
import { View, TextInput, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { firstPage } from "../../../Store/Slice/ProfileSetup";
const ProfileSetupPage1 = ({ currentIndex }) => {
  const { fullName, email } = useSelector((store) => store.Auth.user);

  const dispatch = useDispatch();
  const { isDark } = useDarkMode();
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  function getData() {
    console.log(dob);
    console.log(fullName);
    console.log(email);
    console.log(gender);
    console.log(bio);
    console.log(profilePicture);
  }
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
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
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
        <CustomDatePicker value={dob} setValue={setDob} editable={true} />
        <CustomGenderDrop
          Gender={gender}
          setGender={setGender}
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
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            maxLength={50}
            placeholderTextColor={
              isDark ? Theme.dark.text + "bf" : Theme.light.text + "bf"
            }
            multiline={true}
            numberOfLines={4}
            style={{ fontSize: responsiveFontSize(1.9), fontWeight: 500 }}
          />
        </View>
        <Text onPress={getData}>get data</Text>
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
