import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import ProfileSetup from "../Screens/ProfileSetup/Index";

const AppNavigation = () => {
  const user = useSelector((store) => store.Auth.user);
  // console.log("form app ", user);

  // forcefully component to rerender
  useEffect(() => {
    if (user.isProfileSetup) {
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
