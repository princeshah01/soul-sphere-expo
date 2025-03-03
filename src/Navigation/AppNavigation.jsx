import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardScreen from "../Screens/OnboardScreen/OnBoardScreen";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Screens/AuthScreens/Login";
import Signup from "../Screens/AuthScreens/SignUp";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
const Stack = createStackNavigator();

const Home = () => {
  return (
    <View>
      <Text onPress={clearAppData}>Home</Text>
    </View>
  );
};

const clearAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("App data cleared");
  } catch (e) {
    console.error("Failed to clear app data", e);
  }
};

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  useEffect(() => {
    const CheckFirstLaunch = async () => {
      const firstTime = await AsyncStorage.getItem("alreadyLaunched");
      if (firstTime === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    CheckFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return <ActivityIndicator size={"large"} color={"black"} />;
  } else if (isFirstLaunch === true) {
    return <OnboardScreen onFinish={() => setIsFirstLaunch(false)} />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forget"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
