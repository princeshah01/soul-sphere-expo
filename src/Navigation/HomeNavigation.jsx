import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import React, { useState, useRef } from "react";
import { Theme } from "../Constant/Theme";
import { useDarkMode } from "../provider/DarkModeProvider";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileNavigation from "./ProfileNavigation";
import Feed from "../Screens/Home/Feed/Index";
import ChatNavigation from "./ChatNavigation";
import MatchStack from "../Screens/Home/MatchScreen/MatchStack";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AntIcon from "@expo/vector-icons/AntDesign";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomButton from "../Components/CustomBotton";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CustomMarker from "../Components/CustomMarker";
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, size) => {
  let iconName;
  if (routeName === "Match") {
    iconName = focused ? "heart" : "heart-outline";
  } else if (routeName === "Feed") {
    iconName = focused ? "home" : "home-outline";
  } else if (routeName === "Profile") {
    iconName = focused ? "person" : "person-outline";
  } else if (routeName === "ChitChat") {
    iconName = focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
  }
  return <Icon name={iconName} size={size} color={Theme.dark.primary} />;
};

const HomeNavigation = ({ filterOpen, bottomSheetRef, isOpen }) => {
  const { isDark } = useDarkMode();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
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
      <Tab.Screen name="Feed">
        {() => (
          <Feed
            filterOpen={filterOpen}
            bottomSheetRef={bottomSheetRef}
            isOpen={isOpen}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Match" component={MatchStack} />
      <Tab.Screen name="ChitChat" component={ChatNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};
const Home = () => {
  const { isDark } = useDarkMode();
  const [values, setValues] = useState([18, 99]);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(-1);
  const [showLabel, setShowLabel] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const bottomSheetRef = useRef(null);
  const Gender = ["Male", "Female", "Non-binary"];
  console.log(selectedGender);

  return (
    <>
      <HomeNavigation
        filterOpen={setBottomSheetOpen}
        isOpen={bottomSheetOpen}
        bottomSheetRef={bottomSheetRef}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        enableOverDrag={false}
        handleIndicatorStyle={{
          backgroundColor: Theme.primary,
        }}
        handleStyle={{
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 0,
        }}
        index={-1}
        style={{
          zIndex: 100,
          position: "relative",
        }}
        snapPoints={["34%"]}
        onClose={() => {
          setBottomSheetOpen(false);
        }}
      >
        <BottomSheetView
          style={{
            backgroundColor: isDark
              ? Theme.dark.background
              : Theme.light.background,
            alignItems: "center",
            gap: 10,
            height: responsiveHeight(32),
          }}
        >
          <View
            style={{
              width: responsiveWidth(90),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.filterHeader,

                isDark && { color: Theme.dark.text },
              ]}
            >
              Filters
            </Text>
            <TouchableOpacity
              onPress={() => {
                setBottomSheetOpen(false);
                bottomSheetRef.current.close();
              }}
            >
              <AntIcon name="closecircleo" size={25} color={Theme.primary} />
            </TouchableOpacity>
          </View>
          {/* gender section */}
          <View
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(9),
              gap: 15,
            }}
          >
            <Text
              style={[
                styles.filterSubHeader,
                isDark && { color: Theme.dark.text },
              ]}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {Gender.map((g, idx) => (
                <TouchableOpacity
                  key={`${idx}-${g}`}
                  onPress={() => {
                    if (selectedGender === g) {
                      setSelectedGender("");
                      return;
                    }
                    setSelectedGender(g);
                  }}
                  style={[
                    styles.genderBtn,
                    g === selectedGender && { backgroundColor: Theme.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.genderText,
                      g === selectedGender && {
                        color: isDark
                          ? Theme.dark.background
                          : Theme.light.background,
                      },
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* age section */}

          <View style={{ width: responsiveWidth(80) }}>
            <Text
              style={[
                styles.filterSubHeader,
                isDark && { color: Theme.dark.text },
              ]}
            >
              Age
            </Text>
            <View
              style={{
                height: responsiveHeight(6),
                width: "100%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 20,
                  width: "100%",
                  position: "absolute",
                  top: 14,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: isDark ? Theme.dark.text : Theme.light.text,
                  }}
                >
                  18
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: isDark ? Theme.dark.text : Theme.light.text,
                  }}
                >
                  99
                </Text>
              </View>
              {/* slider here */}
              <MultiSlider
                onValuesChangeStart={() => {
                  setShowLabel(() => true);
                }}
                onValuesChangeFinish={() => {
                  setShowLabel(false);
                }}
                customMarker={(e) => (
                  <CustomMarker
                    currentValue={e.currentValue}
                    isDark={isDark}
                    showLabel={showLabel}
                  />
                )}
                values={values}
                min={18}
                max={100}
                step={1}
                sliderLength={responsiveWidth(60)}
                markerStyle={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderColor: Theme.primary,
                  borderWidth: 1,
                  backgroundColor: isDark
                    ? Theme.dark.background
                    : Theme.light.background,
                }}
                markerOffsetY={showLabel ? -13 : 1}
                selectedStyle={{ backgroundColor: Theme.primary }}
                unselectedStyle={{
                  backgroundColor: isDark
                    ? Theme.dark.border
                    : Theme.light.border,
                  borderRadius: 10,
                }}
                onValuesChange={(val) => setValues(val)}
                trackStyle={{ height: 6 }}
              />
            </View>
          </View>

          {/* buttons */}
          <View
            style={{
              flexDirection: "row",
              width: responsiveWidth(80),
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              outline={true}
              name="Reset"
              onPress={() => {
                setSelectedGender("");
                setValues([18, 99]);
                bottomSheetRef?.current?.close();
                console.log("call api");
              }}
            />
            <CustomButton
              name="Apply"
              onPress={() => {
                console.log("will call feed api with filters data");
                setBottomSheetOpen(false);
                bottomSheetRef?.current?.close();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  filterSubHeader: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 600,
    textAlign: "left",
  },
  filterHeader: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 600,
  },
  genderBtn: {
    borderColor: Theme.primary,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  genderText: {
    fontSize: responsiveFontSize(2),
    color: Theme.primary,
    fontWeight: 600,
  },
});

export default Home;
