import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import CustomGenderDrop from "../../../Components/ProfileSetup/CustomGenderDrop";

const ProfileSetupPage3 = ({ setUserInfo }) => {
  const { isDark } = useDarkMode();
  const [bestPhotos, setBestPhotos] = useState([]);
  const [InterestIn, setInterestIn] = useState("");
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    if (!result.canceled) {
      if (bestPhotos.length < 2) {
        setBestPhotos([...bestPhotos, result.assets[0].uri]);
      }
    }
  };

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      twoBestPics: bestPhotos,
      interestIn: InterestIn,
    }));
  }, [bestPhotos, InterestIn]);
  return (
    <View style={{ width: responsiveWidth(100) }}>
      <View style={{ width: responsiveWidth(90), alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: responsiveFontSize(2.4),
            margin: 10,
            fontWeight: 500,
            color: isDark ? Theme.dark.text : Theme.light.text,
          }}
        >
          Add your best photos to get a higher amount of daily match
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {bestPhotos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(25),
                borderRadius: 10,
                marginRight: 10,
              }}
            />
          ))}
          {bestPhotos.length < 2 && (
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(25),
                borderRadius: 10,
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(4),
                  color: Theme.primary,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ width: responsiveWidth(90), alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: responsiveFontSize(2.4),
            margin: 10,
            fontWeight: 500,
            color: isDark ? Theme.dark.text : Theme.light.text,
          }}
        >
          Who are you interested in?
        </Text>
        <CustomGenderDrop
          Gender={InterestIn}
          setGender={setInterestIn}
          placeholder="Select your preference"
          editable={true}
        />
      </View>
    </View>
  );
};

export default ProfileSetupPage3;

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(100),
  },
});
