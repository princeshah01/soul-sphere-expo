import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/AntDesign";
import { Theme } from "../../Constant/Theme";
const CustomProfileBtn = ({
  iconName,
  name,
  onPress,
  isDark,
  notify = false,
  notifycount,
  isVerified,
}) => {
  return (
    <TouchableOpacity
      disabled={isVerified}
      onPress={onPress}
      style={{
        flexDirection: "row",
        fontWeight: 600,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          marginBottom: 3,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            elevation: 3,
            borderColor: isDark ? Theme.dark.border : Theme.light.border,
            backgroundColor: isDark
              ? Theme.dark.secondary
              : Theme.light.secondary,
            width: 40,
            height: 40,
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Icons
            name={iconName}
            size={20}
            style={[
              { margin: "auto" },
              isVerified && {
                opacity: 0.6,
              },
            ]}
            color={
              name.toLowerCase() === "logout"
                ? "red"
                : isDark
                ? Theme.dark.text
                : Theme.light.text
            }
          />
          {notify && (
            <View
              style={{
                backgroundColor: "red",
                width: 16,
                height: 16,
                position: "absolute",
                borderRadius: 8,
                top: -2,
                right: -2,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: Theme.light.background,
                  textAlign: "center",
                }}
              >
                {notifycount}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text
            style={[
              styles.btnText,
              {
                color: isDark ? Theme.dark.text : Theme.light.text,
              },
              isVerified && {
                opacity: 0.6,
              },
            ]}
          >
            {name}
          </Text>
          {isVerified && (
            <Text
              style={{
                color: isDark ? Theme.dark.text : Theme.light.text,
                opacity: 0.6,
              }}
            >
              Your Account is Verified
            </Text>
          )}
        </View>
      </View>

      <View style={{ marginRight: 8 }}>
        <Icons
          name="right"
          color={isDark ? Theme.dark.text : Theme.light.text}
          size={24}
          style={
            isVerified && {
              opacity: 0.6,
            }
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomProfileBtn;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 1.2,
    textTransform: "capitalize",
  },
});
