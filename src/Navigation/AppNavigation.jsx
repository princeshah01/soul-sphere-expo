import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import ProfileSetup from "../Screens/ProfileSetup/Index";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const user = useSelector((store) => store.Auth.user);
  console.log("form app ", user);

  useEffect(() => {
    if (user.isProfileSetup) {
      console.log("Redirecting to Home...");
    } else {
      console.log("Redirecting to ProfileSetup...");
    }
  }, [user.isProfileSetup]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          {user.isProfileSetup ? (
            <Stack.Screen
              name="Home"
              component={HomeNavigation}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="ProfileSetup"
              component={ProfileSetup}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
