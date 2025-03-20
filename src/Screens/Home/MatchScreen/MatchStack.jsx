import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserConnection from "./Index";
import ProfileView from "../ChatScreen/ProfileView";
import { createStackNavigator } from "@react-navigation/stack";

const matchStack = createStackNavigator();

const MatchStack = () => {
  return (
    <matchStack.Navigator
      initialRouteName="Connections"
      screenOptions={{ headerShown: false }}
    >
      <matchStack.Screen name="Connections" component={UserConnection} />
      <matchStack.Screen name="profileView" component={ProfileView} />
    </matchStack.Navigator>
  );
};

export default MatchStack;

const styles = StyleSheet.create({});
