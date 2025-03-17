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
function MainApp() {
  const Auth = useSelector((store) => store.Auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const getDataFromLocal = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        let user = null;
        const res = await axios.get(env.API_BASE_URL + "/profile/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        if (res.status === 200 && res.data) {
          user = res.data.userInfo;
        }
        if (token && user) {
          // const parsedUser = JSON.parse(user);
          dispatch(
            login({
              token: token,
              user: user,
              isAuthenticated: true,
            })
          );
          setIsloading(false)
          console.log("User data restored: ", user);
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
  if (isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator size={30} />
    </View>)
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

export default App = () => {
  return (
    <Provider store={AppStore}>
      <DarkModeProvider>
        <MainApp />
      </DarkModeProvider>
    </Provider>
  );
};
