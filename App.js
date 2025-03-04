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
function MainApp() {
  const Auth = useSelector((store) => store.Auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    const GetDataFormLocal = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");
        if (token && user) {
          dispatch(
            login({
              token: token,
              user: JSON.parse(user),
              isAuthenticated: true,
            })
          );
        }
        dispatch(login(data));
      } catch (err) {}
    };
    GetDataFormLocal();
  }, []);

  //subscribing to auth slice of store

  const { isDark } = useDarkMode();
  return (
    <NavigationContainer>
      {Auth ? <AppNavigation /> : <AuthNavigation />}
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationContainer>
  );
}

export default App = () => {
  return (
    <Provider store={AppStore}>
      <DarkModeProvider>
        <MainApp />
      </DarkModeProvider>
    </Provider>
  );
};
