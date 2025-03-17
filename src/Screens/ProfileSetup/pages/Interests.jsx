import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";

const RenderInterestItem = ({ item, toggleInterest }) => {
  const { isDark } = useDarkMode();

  return (
    <TouchableWithoutFeedback onPress={() => toggleInterest(item.id)}>
      <View
        style={[
          styles.interestItem,
          {
            backgroundColor: item.selected
              ? Theme.primary
              : isDark
              ? Theme.dark.text
              : Theme.light.secondary,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={item.selected ? "#fff" : "#000"}
        />
        <Text
          style={[
            styles.interestText,
            { color: item.selected ? "#fff" : "#000" },
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  interestItem: {
    width: "auto",
    flexDirection: "row",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  interestText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
export default RenderInterestItem;
