import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const GradientText = ({ children, style }) => {
  return (
    <Text style={[{ backgroundColor: "transparent" }, style]}>{children}</Text>
  );
};

export const GradientContainer = ({ wi, he, style }) => {
  return (
    <View style={{ width: wi, height: he, ...style }}>
      <LinearGradient
        colors={["#ff2e70", "#f59031"]}
        locations={[0.59, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export const GradientButton = ({
  name,
  onPress,
  wi = "100%",
  styleByProp,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: "#a83ef5",
          width: wi,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          opacity: disabled && 0.7,
        },
        styleByProp,
      ]}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
