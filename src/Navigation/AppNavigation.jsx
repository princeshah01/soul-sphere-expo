import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slice/Auth";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();
//// if want to clear async storage then use code below

const clearAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("App data cleared");
  } catch (e) {
    console.error("Failed to clear app data", e);
  }
};

// clearing AsyncStorage end here
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.Auth.user);
  console.log("from app navigation", user);
  return (
    <View>
      <Text
        onPress={async () => {
          dispatch(logout());
          clearAppData();
        }}
      >
        Home
      </Text>
      <Text>{user.bio}</Text>
      {/* <Text>{token}</Text> */}
    </View>
  );
};

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
