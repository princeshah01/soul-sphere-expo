import { StyleSheet, View, Dimensions, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Theme } from "../../Constant/Theme";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const genderOptions = [
  { label: "Male", value: "Male", icon: "gender-male" },
  { label: "Female", value: "Female", icon: "gender-female" },
  { label: "Non-binary", value: "Non-binary", icon: "gender-non-binary" },
];

const { width } = Dimensions.get("window");

const CustomGenderDrop = ({
  Gender,
  setGender,
  editable = false,
  style,
  placeholder,
}) => {
  const { isDark } = useDarkMode();

  return (
    <View style={styles.container}>
      <Dropdown
        renderLeftIcon={() => {
          const selectedItem = genderOptions.find(
            (item) => item.value === Gender
          );
          return selectedItem ? (
            <MaterialCommunityIcons
              name={selectedItem.icon}
              size={22}
              color={Theme.primary}
              style={{ marginRight: 12 }}
            />
          ) : null;
        }}
        style={[
          styles.input,
          !editable && styles.disabled,
          isDark && styles.darkInput,
          style,
        ]}
        iconStyle={{ color: isDark ? Theme.dark.text : Theme.light.text }}
        placeholder={placeholder || "Select Gender"}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: isDark ? Theme.dark.text : Theme.light.text },
        ]}
        containerStyle={[
          styles.dropdownContainer,
          isDark && styles.darkDropdown,
          ,
          { ...style },
        ]}
        data={genderOptions}
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={Theme.primary}
            />
            <Text
              style={[
                styles.selectedTextStyle,
                { color: isDark ? Theme.dark.text : Theme.light.text },
              ]}
            >
              {item.label}
            </Text>
          </View>
        )}
        activeColor={isDark ? Theme.dark.secondary : "#E3E3E3"}
        labelField="label"
        valueField="value"
        value={Gender}
        onChange={(item) => setGender(item.value)}
        disable={!editable}
      />
    </View>
  );
};

export default CustomGenderDrop;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.light.border,
    backgroundColor: Theme.light.background,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    width: width * 0.75, // Slightly wider for better UI
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  darkInput: {
    borderColor: Theme.dark.border,
    backgroundColor: Theme.dark.background,
  },
  disabled: {
    opacity: 0.6,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    width: width * 0.75,
    elevation: 3,
    backgroundColor: Theme.light.background,
  },
  darkDropdown: {
    borderColor: Theme.dark.border,
    backgroundColor: Theme.dark.background,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
  },
});
