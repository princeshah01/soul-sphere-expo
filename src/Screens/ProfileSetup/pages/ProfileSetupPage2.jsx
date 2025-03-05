import { StyleSheet, Text, View, FlatList } from "react-native";

import React, { useState } from "react";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import LocationPicker from "./LocationPicker";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import RenderInterestItem from "./Interests";
import interestData from "../../../Constant/interestData";

const ProfileSetupPage2 = () => {
  const toggleInterest = (id) => {
    const updatedInterests = interests.map((interest) =>
      interest.id === id
        ? { ...interest, selected: !interest.selected }
        : interest
    );
    setInterests(updatedInterests);
  };
  const { isDark } = useDarkMode();
  const [interests, setInterests] = useState(interestData);

  return (
    <View style={styles.mainContainer}>
      <LocationPicker />
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
