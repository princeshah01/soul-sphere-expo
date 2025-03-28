import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/AntDesign";
import { Theme } from "../Constant/Theme";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
const InputField = ({
  name,
  isPassword = false,
  icon,
  dataValue,
  setValue,
  isDark,
  verify,
}) => {
  const [isShown, setIsShown] = useState(isPassword);
  function getIconColor() {
    if (verify == null) return Theme.primary;
    return verify ? "green" : "red";
  }

  return (
    <View style={{ gap: responsiveHeight(1.5) }}>
      <Text
        style={{
          fontSize: responsiveFontSize(2),
          fontWeight: 600,
          color: isDark && Theme.dark.text,
        }}
      >
        {name}
      </Text>
      <View
        style={[
          {
            backgroundColor: isDark
              ? Theme.dark.secondary
              : Theme.light.secondary,
            borderColor: isDark ? Theme.dark.border : Theme.light.border,
          },
          styles.container,
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={icon}
            size={icon == "lock" ? 25 : 20}
            color={getIconColor()}
          />
          <TextInput
            keyboardType={
              name.toLowerCase() == "email" ? "email-address" : "default"
            }
            value={dataValue}
            onChangeText={(e) => setValue(e)}
            width={responsiveWidth(71)}
            secureTextEntry={isShown}
            paddingHorizontal={responsiveWidth(2)}
            paddingVertical={responsiveHeight(2)}
            fontSize={responsiveFontSize(1.8)}
            color={isDark && Theme.dark.text}
            placeholder={`Enter ${name}`}
            placeholderTextColor="#888"
            backgroundColor="transparent"
          />
        </View>
        {isPassword && (
          <TouchableWithoutFeedback
            onPress={() => {
              setIsShown(!isShown);
            }}
          >
            {isShown ? (
              <Ionicons
                name="eye"
                size={responsiveFontSize(2.5)}
                color={isDark ? "gray" : "gray"}
              />
            ) : (
              <Ionicons
                name="eye-off"
                size={responsiveFontSize(2.5)}
                color={isDark ? Theme.light.secondary : "gray"}
              />
            )}
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    elevation: 3,
  },
});
