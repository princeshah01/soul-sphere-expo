import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { Theme } from "../../Constant/Theme";
import { useDarkMode } from "../../provider/DarkModeProvider";
const { width, height } = Dimensions.get("window");

const CustomDatePicker = ({ value, setValue, editable = false }) => {
  const { isDark } = useDarkMode();
  const DateValue = new Date(value);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue(selectedDate.toDateString());
    }
  };
  const dateToBeShown = new Date().getFullYear() - 18;
  // console.log(dateToBeShown);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowDatePicker(editable)}
        style={[
          styles.input,
          isDark && {
            borderColor: Theme.dark.border,
            backgroundColor: Theme.dark.background,
          },
          { opacity: editable ? 1 : 0.7 },
        ]}
      >
        <Icon
          name="calendar-number"
          size={20}
          color={Theme.primary}
          style={{ opacity: editable ? 0.9 : 0.6 }}
        />
        <Text
          style={{
            width: "80%",
            fontSize: 14,
            opacity: editable ? 0.9 : 0.5,
            color: isDark ? Theme.dark.text : Theme.light.text,
            fontWeight: 600,
          }}
        >
          {DateValue.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          themeVariant="dark"
          value={DateValue || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          color="red"
          maximumDate={new Date(dateToBeShown, 11, 31)}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  input: {
    borderColor: Theme.light.border,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    width: width * 0.75,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 3,
    backgroundColor: Theme.light.background,
  },
});
