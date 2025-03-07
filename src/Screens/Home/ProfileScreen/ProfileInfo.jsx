import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../../Components/ProfileSetup/CustomInput";
import CustomDatePicker from "../../../Components/ProfileSetup/CustomDatePicker";
import ProfileImage from "../../../Components/ProfileSetup/ProfileImage";
import CustomGenderDrop from "../../../Components/ProfileSetup/CustomGenderDrop";
import { GradientButton } from "../../../Components/Gradient";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import BackButton from "../../../Components/BackButton";
import { useSelector } from "react-redux";
import { updateUser } from "../../../Store/Slice/Auth";
import Icon from "@expo/vector-icons/Ionicons";
import env from "../../../Constant/env";
import { useDispatch } from "react-redux";
const { width } = Dimensions.get("window");
import { showToast } from "../../../Components/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileInfo = ({ navigation }) => {
  const user = useSelector((store) => store.Auth.user);
  const dispatch = useDispatch();
  const { bio, fullName, email, locationName, dob, gender, profilePicture } =
    user;
  // console.log(bio, fullName, email, locationName, dob, gender, profilePicture);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fullName);
  const [Email, setEmail] = useState(email);
  const [Gender, setGender] = useState(gender);
  const [propic, setProPic] = useState(profilePicture);
  const [Location, setLocation] = useState(locationName);
  const [Bio, setBio] = useState(bio);
  const [Dob, setDob] = useState(new Date(dob));
  const { isDark } = useDarkMode();
  const HandleUpdate = async () => {
    setIsEditing(false);
    showToast("success", "your profile been updated successfully ");
    const newUser = {
      ...user,
      fullName: name,
      email: Email,
      gender: Gender,
      profilePicture: propic,
      locationName: Location,
      bio: Bio,
      dob: Dob.toDateString(),
    };
    dispatch(
      updateUser(newUser)
      // hit api to save db in back end
    );
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton navigation={navigation} isDark={isDark} />
          <Text
            style={[
              styles.title,
              { color: isDark ? Theme.dark.text : Theme.light.text },
            ]}
          >
            Profile Details
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsEditing(!isEditing);
          }}
        >
          <View
            style={{
              padding: 5,
              backgroundColor: isDark
                ? Theme.dark.secondary
                : Theme.light.secondary,
              borderRadius: 12,
            }}
          >
            <Text
              style={{ color: isDark ? Theme.dark.text : Theme.light.text }}
            >
              <Icon name="pencil" size={24} />
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <ProfileImage
          profilePicture={env.API_BASE_URL + profilePicture}
          disabled={!isEditing}
          setProfilePicture={setProPic}
        />
        <CustomInput
          name="UserName"
          iconName="person"
          isEditable={isEditing}
          value={name}
          setValue={setName}
        />
        <CustomInput
          name="Email"
          iconName="mail"
          isEditable={false}
          value={Email}
          setValue={setEmail}
        />
        <CustomInput
          name="Location"
          iconName="location"
          isEditable={isEditing}
          value={Location}
          setValue={setLocation}
        />
        <CustomInput
          name="Bio"
          iconName="newspaper-outline"
          isEditable={isEditing}
          value={Bio}
          multiline={true}
          setValue={setBio}
        />
        <CustomDatePicker value={Dob} setValue={setDob} editable={isEditing} />
        {/* <InterestRender interests={Interest} disabled={isEditing} /> */}
        <CustomGenderDrop
          Gender={Gender}
          setGender={setGender}
          editable={isEditing}
        />
        <GradientButton
          name="save"
          styleByProp={{ width: width * 0.75 }}
          disabled={!isEditing}
          onPress={HandleUpdate}
        />
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    paddingRight: "20",
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
  main: { alignItems: "center", gap: 20 },
  interestCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    backgroundColor: "#ff2d70",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
