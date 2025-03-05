import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import ProfileSetup from "../Screens/ProfileSetup/Index";
// import { View, Text } from "react-native";
// import { useDispatch } from "react-redux";
// import { logout } from "../Store/Slice/Auth";

const Stack = createStackNavigator();
//// if want to clear async storage then use code below

// const clearAppData = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log("App data cleared");
//   } catch (e) {
//     console.error("Failed to clear app data", e);
//   }
// };

// clearing AsyncStorage end here

// const ProfileSetup = () => {
//   const dispatch = useDispatch();
//   return (
//     <View>
//       <Text
//         onPress={async () => {
//           dispatch(logout());
//           clearAppData();
//         }}
//       >
//         Profile Setup
//       </Text>
//     </View>
//   );
// };

const AppNavigation = () => {
  const user = useSelector((store) => store.Auth.user);
  // console.log("from app navigation", user);
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
