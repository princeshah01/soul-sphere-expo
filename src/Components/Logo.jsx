import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Logo = ({ size }) => {
  return (
    <View style={{ alignSelf: "center" }}>
      <Image
        style={{ width: size, height: size }}
        source={require("../../assets/Logo-Soulmate.png")}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
