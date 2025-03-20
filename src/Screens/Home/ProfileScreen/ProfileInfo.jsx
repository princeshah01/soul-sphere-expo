import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
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
import { useDispatch } from "react-redux";
import { showToast } from "../../../Components/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import axios from "axios";
import env from "../../../Constant/env";

const { width } = Dimensions.get("window");
const ProfileInfo = ({ navigation }) => {
  const { user, token } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { bio, fullName, email, locationName, dob, gender, profilePicture } =
    user;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fullName);
  const [Email, setEmail] = useState(email);
  const [Gender, setGender] = useState(gender);
  const [propic, setProPic] = useState(profilePicture);
  const [Location, setLocation] = useState(locationName);
  const [Bio, setBio] = useState(bio);
  const [Dob, setDob] = useState(new Date(dob));
  const { isDark } = useDarkMode();
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const updateLocation = async (location) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`,
        {
          headers: {
            "User-Agent": "ProjectDemo/1.0 ",
            "Accept-Language": "en",
          },
        }
      );
      if (res.data && res.data.length > 0) {
        const newCoordinates = {
          type: "Point",
          coordinates: [
            parseFloat(res.data[0].lat),
            parseFloat(res.data[0].lon),
          ],
        };
        const newLocationName = res.data[0].display_name;
        return { newCoordinates, newLocationName };
      }
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Failed to fetch location"
      );
    }
    return null;
  };

  const handleUpdate = async () => {
    setIsloading(true);
    try {
      let newCoordinates = null;
      let newLocationName = Location;

      if (isLocationChanged) {
        const locationData = await updateLocation(Location);
        if (locationData) {
          newCoordinates = locationData.newCoordinates;
          newLocationName = locationData.newLocationName;
        } else {
          showToast("error", "No such location found.");
          return;
        }
      }

      const updateData = {
        fullName: name,
        gender: Gender,
        profilePicture: propic,
        locationName: newLocationName,
        bio: Bio,
        dob: Dob.toString(),
        locationcoordinates: newCoordinates,
      };

      let formData = new FormData();
      Object.keys(updateData).forEach((key) => {
        if (key !== "profilePicture" && key !== "locationcoordinates") {
          formData.append(key, updateData[key]);
        }
      });

      if (
        propic &&
        typeof propic === "string" &&
        propic.startsWith("file://")
      ) {
        formData.append("profilePicture", {
          uri: propic,
          name: "profilePicture.jpg",
          type: "image/jpeg",
        });
      }

      if (newCoordinates) {
        formData.append("locationcoordinates", JSON.stringify(newCoordinates));
      }

      const response = await axios.patch(
        `${env.API_BASE_URL}/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data && response.status === 200) {
        const newUser = { ...user, ...updateData };
        dispatch(updateUser(newUser));
        // await AsyncStorage.setItem("user", JSON.stringify(newUser));
        showToast("success", "Your profile has been updated successfully.");
        setIsEditing(false);
        setIsLocationChanged(false);
      } else {
        showToast("error", "failed to update your profile.");
      }
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "failed to update profile - server error"
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
          profilePicture={propic}
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
          setValue={(value) => {
            setLocation(value);
            setIsLocationChanged(true);
          }}
        />
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: isDark
                ? Theme.dark.background
                : Theme.light.background,
              borderColor: isDark ? Theme.dark.border : Theme.light.border,
            },
            { opacity: isEditing ? 1 : 0.6 },
          ]}
        >
          <Icon
            name="newspaper-outline"
            size={20}
            color={Theme.primary}
            style={{ alignSelf: "center", marginHorizontal: 8 }}
          />
          <TextInput
            editable={isEditing}
            value={Bio}
            onChangeText={setBio}
            placeholder="Enter about yourself..."
            maxLength={50}
            placeholderTextColor={
              isDark ? Theme.dark.text + "66" : Theme.light.text + "66"
            }
            multiline={true}
            numberOfLines={4}
            style={[
              styles.inputText,
              {
                color: isDark ? Theme.dark.text : Theme.light.text,
              },
              { opacity: isEditing ? 0.9 : 0.7 },
            ]}
          />
        </View>

        <CustomDatePicker value={Dob} setValue={setDob} editable={isEditing} />
        <CustomGenderDrop
          Gender={Gender}
          setGender={setGender}
          editable={isEditing}
        />
        <GradientButton
          name="save"
          styleByProp={{ width: width * 0.75 }}
          disabled={isLoading || !isEditing}
          onPress={handleUpdate}
        />
      </View>
    </ScrollView>
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
    paddingRight: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    width: responsiveWidth(75),
    height: responsiveHeight(10),
    paddingHorizontal: 10,
    elevation: 2,
  },
  inputText: {
    flex: 1,
    alignSelf: "flex-start",
    maxHeight: responsiveHeight(),
    fontSize: responsiveFontSize(1.8),
    fontWeight: "600",
  },
});
