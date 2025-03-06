import { StyleSheet, Text, View, FlatList } from "react-native";

import React, { useState, useEffect } from "react";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import LocationPicker from "./LocationPicker";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import RenderInterestItem from "./Interests";
import interestData from "../../../Constant/interestData";

const ProfileSetupPage2 = ({ userInfo, setUserInfo }) => {
  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.map((interest) =>
        interest.id === id
          ? { ...interest, selected: !interest.selected }
          : interest
      )
    );
    const selectedInterest = interests.find((item) => item.id === id);
    if (selectedInterest) {
      if (selectedInterest.selected) {
        setInterestToSave((prev) =>
          prev.filter((name) => name !== selectedInterest.name)
        );
      } else {
        setInterestToSave((prev) => [...prev, selectedInterest.name]);
      }
    }
  };
  const { isDark } = useDarkMode();
  const [InterestToSave, setInterestToSave] = useState([]);
  const [interests, setInterests] = useState(interestData);
  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      interest: InterestToSave,
    }));
  }, [InterestToSave]);
  return (
    <View style={styles.mainContainer}>
      <LocationPicker userInfo={userInfo} setUserInfo={setUserInfo} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: responsiveFontSize(2.4),
            margin: 10,
            fontWeight: 500,
            color: isDark ? Theme.dark.text : Theme.light.text,
          }}
        >
          What do you love to do?
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={interests}
          renderItem={({ item }) => (
            <RenderInterestItem item={item} toggleInterest={toggleInterest} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={{
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
};

export default ProfileSetupPage2;

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(100),
    flex: 1,
  },
});

// const updatedInterests = interests.map((interest) =>
//   interest.id === id
//     ? { ...interest, selected: !interest.selected }
//     : interest
// );
