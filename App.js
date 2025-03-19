import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/Navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DarkModeProvider from "./src/provider/DarkModeProvider";
import { useDarkMode } from "./src/provider/DarkModeProvider";
import { Provider } from "react-redux";
import AppStore from "./src/Store/Store";
import AuthNavigation from "./src/Navigation/Authnavigation";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "./src/Store/Slice/Auth";
import { Theme } from "./src/Constant/Theme";
import Toast from "react-native-toast-message";
import axios from "axios";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import env from "./src/Constant/env";
import { showToast } from "./src/Components/showToast";

function MainApp() {
  const Auth = useSelector((store) => store.Auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          // console.log("No token found.");
          setIsLoading(false);
          return;
        }

        const res = await axios.get(`${env.API_BASE_URL}/profile/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200 && res.data) {
          dispatch(
            login({
              token: token,
              user: res.data,
              isAuthenticated: true,
            })
          );
          // console.log("User data restored: ", res.data);
        } else {
          // console.log("No user data found.");

          // this will work when token will get expired
          showToast("error", "no data found");
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Retrieving error:", err);

        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(
            login({
              token: token,
              user: parsedUser,
              isAuthenticated: true,
            })
          );
        } else {
          dispatch(
            login({
              token: null,
              user: null,
              isAuthenticated: false,
            })
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    getDataFromLocal();
  }, []);

  const { isDark } = useDarkMode();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {Auth ? <AppNavigation /> : <AuthNavigation />}
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={
            isDark ? Theme.dark.background : Theme.light.background
          }
        />
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <Provider store={AppStore}>
      <DarkModeProvider>
        <MainApp />
      </DarkModeProvider>
    </Provider>
  );
}
