import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/Home/ProfileScreen/ProfileScreen.jsx";
import ProfileInfo from "../Screens/Home/ProfileScreen/ProfileInfo.jsx";
import Help from "../Screens/Home/ProfileScreen/Help.jsx";
import Contact from "../Screens/Home/ProfileScreen/Contact.jsx";
import SubscriptionScreen from "../Screens/Home/ProfileScreen/Pay/Subscription.jsx";
import About from "../Screens/Home/ProfileScreen/About.jsx";
import Setting from "../Screens/Home/ProfileScreen/Setting.jsx";
import HelpHistory from "../Screens/Home/ProfileScreen/HelpHistory.jsx";
import Requests from "../Screens/Home/ProfileScreen/Requests.jsx";
import Favorite from "../Screens/Home/ProfileScreen/Favorite.jsx";
import VerifyAccount from "../Screens/Home/ProfileScreen/VerifyAccount.jsx";
import ProfileView from "../Screens/Home/ChatScreen/ProfileView.jsx";
const SettingStack = createStackNavigator();

const SettingNavigation = () => {
  return (
    <View edges={["top"]} style={{ flex: 1 }}>
      <SettingStack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{ headerShown: false }}
      >
        {/* <SettingStack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
        />*/}

        <SettingStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <SettingStack.Screen name="Setting" component={Setting} />
        <SettingStack.Screen name="About" component={About} />
        <SettingStack.Screen name="Help" component={Help} />
        <SettingStack.Screen name="Contact" component={Contact} />
        <SettingStack.Screen name="ProfileInfo" component={ProfileInfo} />
        <SettingStack.Screen name="HelpHistory" component={HelpHistory} />
        <SettingStack.Screen name="Requests" component={Requests} />
        <SettingStack.Screen name="Favorite" component={Favorite} />
        <SettingStack.Screen name="VerifyAccount" component={VerifyAccount} />
        <SettingStack.Screen name="Pay" component={SubscriptionScreen} />
        <SettingStack.Screen name="ProfileViewFav" component={ProfileView} />
      </SettingStack.Navigator>
    </View>
  );
};

export default SettingNavigation;

const styles = StyleSheet.create({});
