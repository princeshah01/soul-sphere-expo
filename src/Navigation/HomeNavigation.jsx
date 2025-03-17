import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import { Theme } from "../Constant/Theme";
import { useDarkMode } from "../provider/DarkModeProvider";
import { View, Text } from "react-native";
import ProfileNavigation from "./ProfileNavigation";
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, size) => {
  let iconName;
  if (routeName === "Match") {
    iconName = focused ? "heart" : "heart-outline";
  } else if (routeName === "Feed") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Profile") {
    iconName = focused ? "person" : "person-outline";
  } else if (routeName === "Chat") {
    iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
  }
  return <Icon name={iconName} size={size} color={Theme.dark.primary} />;
};

const Feed = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.light.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Feed</Text>
    </View>
  );
};
const UserConnections = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.light.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>UserConnection</Text>
    </View>
  );
};
const ChitChat = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.light.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>ChitChat</Text>
    </View>
  );
};

const HomeNavigation = () => {
  const { isDark } = useDarkMode();
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: Theme.primary,
        tabBarStyle: {
          borderColor: isDark ? Theme.dark.background : Theme.light.background,
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
        tabBarIcon: ({ focused, size }) =>
          getTabBarIcon(route.name, focused, size, isDark),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Match" component={UserConnections} />
      <Tab.Screen name="Chat" component={ChitChat} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};
export default HomeNavigation;
