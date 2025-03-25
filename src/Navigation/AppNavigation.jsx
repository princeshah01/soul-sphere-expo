import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import ProfileSetup from "../Screens/ProfileSetup/Index";

const AppNavigation = () => {
  const { user, chatToken, streamApiKey } = useSelector((store) => store.Auth);

  useEffect(() => {
    if (user.isProfileSetup) {
      console.log("🚀 ~ AppNavigation ~ streamApiKey:", streamApiKey);
      console.log("🚀 ~ AppNavigation ~ chatToken:", chatToken);
      console.log("redirecting to home");
    } else {
      console.log("redirecting to profile setup ");
    }
  }, [user.isProfileSetup]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {user.isProfileSetup ? <HomeNavigation /> : <ProfileSetup />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
