import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Theme } from "../../Constant/Theme";
import Icon from "@expo/vector-icons/Ionicons";
import { useDarkMode } from "../../provider/DarkModeProvider";

const ProfileImage = ({
  profilePicture,
  size = 110,
  disabled = true,
  setProfilePicture,
}) => {
  const { isDark } = useDarkMode();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
  return (
    <View
      style={[
        styles.mainContainer,
        {
          width: size,
          height: size,
          padding: size * 0.0285,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        disabled={disabled}
        onPress={() => pickImage(setProfilePicture)}
        style={styles.profileBtn}
      >
        {profilePicture ? (
          <Image
            source={{ uri: `${profilePicture}` }}
            style={{
              width: size * 0.95,
              height: size * 0.95,
              borderRadius: size * 0.5,
            }}
          />
        ) : (
          <Image
            source={require("../../../assets/userDemo.jpg")}
            style={{
              width: size * 0.95,
              height: size * 0.95,
              borderRadius: size * 0.5,
            }}
          />
        )}
        {!disabled && (
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: isDark
                ? Theme.dark.secondary
                : Theme.light.secondary,
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: isDark ? Theme.dark.border : Theme.light.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="camera-outline" size={20} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.primary,
    alignSelf: "center",
    borderRadius: 200,
    marginVertical: 15,
  },
  profileBtn: [
    {
      alignItems: "center",
      marginBottom: 20,
    },
  ],
});
