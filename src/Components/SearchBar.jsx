import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { Dimensions, TextInput, View, TouchableOpacity } from "react-native";
import { Theme } from "../Constant/Theme";
const { width } = Dimensions.get("window");

const SearchBar = ({ handleSearch, search, isDark }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: isDark ? Theme.dark.border : Theme.light.border,
        justifyContent: "space-between",
        width: width * 0.8,
        elevation: 3,
      }}
    >
      {
        <View>
          <TextInput
            value={search}
            onChangeText={(value) => handleSearch(value)}
            style={{
              marginLeft: 10,
              width: 120,
              color: isDark ? Theme.dark.text : Theme.light.text,
            }}
            placeholder="search"
            placeholderTextColor={isDark ? Theme.dark.text : Theme.light.text}
          />
        </View>
      }
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Icon
          name="search"
          color={isDark ? Theme.dark.text : Theme.light.text}
          size={20}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
