import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/Navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
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

function MainApp() {
  const Auth = useSelector((store) => store.Auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");

        if (token && user) {
          const parsedUser = JSON.parse(user);
          dispatch(
            login({
              token: token,
              user: parsedUser,
              isAuthenticated: true,
            })
          );
          // console.log("User data restored: ", parsedUser);
        } else {
          console.log("No user");
        }
      } catch (err) {
        console.error("retrieving error", err);
      }
    };

    getDataFromLocal();
  }, [dispatch]);
  //  dispatch in dependsncy array will make sure that this will only called when this component rerenders

  // Subscribing to Auth slice of store
  const { isDark } = useDarkMode();

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

export default App = () => {
  return (
    <Provider store={AppStore}>
      <DarkModeProvider>
        <MainApp />
      </DarkModeProvider>
    </Provider>
  );
};
