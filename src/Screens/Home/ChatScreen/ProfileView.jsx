import { StyleSheet, Text, View, Image } from "react-native";
import React, { useRef, useMemo, useEffect } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Theme } from "../../../Constant/Theme";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";
import InterestRender from "../Feed/InterestRender";
import Icon from "@expo/vector-icons/Ionicons";
import ContactButton from "../../../Components/ContactButton";
import { useSelector } from "react-redux";
const ProfileView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDark } = useDarkMode();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "90%"], []);
  const userInfo = route?.params?.userInfo;
  const twoPics = userInfo?.twoBestPics;
  console.log("🚀 ~ ProfileView ~ userInfo:", twoPics);

  const { isPremiumUser } = useSelector((store) => store.Auth.user);

  useEffect(() => {
    return () => {
      bottomSheetRef.current?.snapToIndex(0);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <View style={styles.header}>
        <BackButton
          navigation={navigation}
          // onPress={handleBack}
          isDark={isDark}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: userInfo.profilePicture,
          }}
          style={styles.profileImage}
        />
      </View>
      {/* bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: Theme.primary }}
        handleStyle={{
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 0,
        }}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.sheetContent,
            isDark && { backgroundColor: Theme.dark.background },
          ]}
        >
          <View style={{ gap: 8 }}>
            {/* details */}
            {/* name and Chat buttons */}
            <View
              style={{ alignSelf: "center", flexDirection: "row", gap: 30 }}
            >
              {/* Buttons */}
              <ContactButton
                name="call-outline"
                onPress={() => {
                  if (isPremiumUser) {
                    navigation.navigate("Chat", { screen: "call" });
                  } else {
                    navigation.navigate("Profile", { screen: "Pay" });
                  }
                }}
              />
              <ContactButton
                name="chatbubble-outline"
                onPress={() => {
                  navigation.navigate("Chat", { screen: "ChatRoom" });
                }}
              />
            </View>
            <View style={styles.section}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Icon
                  name={
                    userInfo?.gender?.toLowerCase() === "non-binary"
                      ? "transgender-outline"
                      : userInfo?.gender?.toLowerCase()
                  }
                  size={20}
                  color={isDark ? Theme.dark.text : Theme.light.text}
                />
                <Text
                  style={{
                    color: isDark ? Theme.dark.text : Theme.light.text,
                    fontSize: responsiveScreenFontSize(3),
                    fontWeight: 600,
                  }}
                >
                  {userInfo.fullName +
                    ", " +
                    (userInfo?.age ? userInfo.age : 24)}
                </Text>

                {userInfo.isVerified && (
                  <Text
                    style={{
                      backgroundColor: Theme.primary + "B3",
                      color: Theme.light.background,
                      alignSelf: "flex-start",
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                      fontSize: 12,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    Verified
                  </Text>
                )}
              </View>
            </View>
            {/* location and km */}
            <View style={styles.section}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  color: isDark ? Theme.dark.text : Theme.light.text,
                }}
              >
                {userInfo.locationName}
              </Text>
              <Text
                style={{
                  borderColor: Theme.primary,
                  borderWidth: 1,
                  padding: 3,
                  paddingHorizontal: 5,
                  borderRadius: 20,
                  color: Theme.primary,
                }}
              >
                3km away
              </Text>
            </View>
            {/* bio */}
            <View style={{ gap: 5 }}>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? Theme.dark.text : Theme.light.text },
                ]}
              >
                Bio
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.8),
                  color: isDark ? Theme.dark.text : Theme.light.text,
                }}
              >
                {userInfo.bio}
              </Text>
            </View>
            {/* Interest */}
            <View style={{ gap: 10 }}>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? Theme.dark.text : Theme.light.text },
                ]}
              >
                Interests
              </Text>
              <InterestRender data={userInfo?.interest} />
            </View>
            {/* best image */}
            <View style={{ gap: 25 }}>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? Theme.dark.text : Theme.light.text },
                ]}
              >
                Best Images
              </Text>
              {twoPics &&
                twoPics.map((img, idx) => {
                  return (
                    <Image
                      key={idx}
                      source={{ uri: img }}
                      style={{
                        width: responsiveScreenWidth(90),
                        height: responsiveScreenHeight(40),
                        resizeMode: "cover",
                        borderRadius: 20,
                      }}
                    />
                  );
                })}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginBottom: 15,
    alignSelf: "flex-start",
    borderRadius: 12,
    zIndex: 10,
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5 },
  title: { fontSize: 20, fontWeight: "600" },
  container: { flex: 1, backgroundColor: "#fff" },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    position: "absolute",
    backgroundColor: "red",
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(70),
  },
  profileImage: { width: "100%", height: "100%" },
  userName: { fontSize: 22, fontWeight: "bold" },
  sheetContent: {
    padding: 20,
    backgroundColor: Theme.light.background,
  },
  description: { fontSize: 16, color: "#666", marginBottom: 15 },
});
