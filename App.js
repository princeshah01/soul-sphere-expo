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
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function MainApp() {
  const Auth = useSelector((store) => store.Auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("🚀 ~ getUserData ~ token:", token);

        if (!token) {
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
            })
          );
        } else {
          showToast("error", "No data found");
        }
      } catch (err) {
        console.error("Retrieving error:", err);
        showToast(
          "error",
          err.response?.data?.message || "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [dispatch]);

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
    <GestureHandlerRootView>
      <Provider store={AppStore}>
        <DarkModeProvider>
          <MainApp />
        </DarkModeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
