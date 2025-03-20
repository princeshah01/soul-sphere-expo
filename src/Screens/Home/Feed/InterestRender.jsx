import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import { getIcon } from "../../../Constant/interestData";

const InterestCard = ({ data, idx, isDark }) => {
  return (
    <View
      key={idx}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: isDark ? Theme.dark.text : Theme.dark.border,
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        borderRadius: 10,
      }}
    >
      <MaterialCommunityIcons
        name={getIcon(data)}
        color={isDark ? Theme.dark.background : Theme.light.background}
      />
      <Text
        style={[
          styles.bio,
          { color: isDark ? Theme.dark.background : Theme.light.background },
        ]}
      >
        {data}
      </Text>
    </View>
  );
};

const InterestRender = ({ data }) => {
  const { isDark } = useDarkMode();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data?.map((item, idx) => {
        return <InterestCard data={item} key={idx} isDark={isDark} />;
      })}
    </View>
  );
};

export default InterestRender;

const styles = StyleSheet.create({
  bio: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
});
