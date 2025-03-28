import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OnboardScreen from "../Screens/OnboardScreen/OnBoardScreen";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Screens/AuthScreens/Login";
import Signup from "../Screens/AuthScreens/SignUp";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
import OTPVerification from "../Screens/AuthScreens/OTPVerification";
const Stack = createStackNavigator();

const AuthNavigation = () => {
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
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerification}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AuthNavigation;
