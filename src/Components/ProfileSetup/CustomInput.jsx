import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { Theme } from "../../Constant/Theme";
const { width } = Dimensions.get("window");

const CustomInput = ({
  name = "password",
  iconName = "lock-closed",
  ispassword = false,
  isEditable = false,
  value,
  setValue,
  multiline = false,
}) => {
  const [isHidden, setIsHidden] = useState(ispassword);
  const [error, setError] = useState(false);
  const { isDark } = useDarkMode();
  const [msg] = useState(`${name} is required field`);
  const togglePass = () => {
    setIsHidden(!isHidden);
  };
  const required = (value) => {
    if (value.length <= 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <View style={{ width: width * 0.75 }}>
      <View
        style={[
          styles.mainView,
          isDark && {
            borderColor: Theme.dark.border,
            backgroundColor: Theme.dark.background,
          },
        ]}
      >
        <Icon
          name={iconName}
          size={20}
          color={Theme.primary}
          style={{ opacity: isEditable ? 0.9 : 0.6 }}
        />
        <TextInput
          editable={isEditable}
          onChangeText={(value) => {
            setValue(value);
            required(value);
          }}
          multiline={multiline}
          numberOfLines={5}
          secureTextEntry={isHidden}
          value={value}
          placeholder={`${name}`}
          placeholderTextColor={isDark ? Theme.dark.text : Theme.light.text}
          style={{
            color: isDark ? Theme.dark.text : Theme.light.text,
            fontSize: 16,
            width: "80%",
            opacity: isEditable ? 0.9 : 0.7,
            fontWeight: 600,
          }}
        />
        {ispassword && (
          <TouchableOpacity onPress={togglePass}>
            <Icon name={isHidden ? "eye-off" : `eye`} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 12,
            color: "red",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          {msg}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.light.border,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.light.background,
    gap: 10,
    elevation: 3,
  },
});
