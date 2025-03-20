import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("screen");
import Icon from "@expo/vector-icons/Ionicons";
import InterestRender from "./InterestRender";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
const Card = ({ user }) => {
  // console.log("card data form card.js", user);
  const { isDark } = useDarkMode();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          borderColor: isDark ? Theme.dark.border : Theme.light.border,
        },
      ]}
    >
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.profilePicture }} style={styles.image} />
          <View style={styles.infoContainer}>
            {user.isVerified && (
              <Text
                style={{
                  backgroundColor: Theme.primary + "B3",
                  color: Theme.light.background,
                  alignSelf: "flex-start",
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Verified
              </Text>
            )}
            <Text
              style={[
                styles.textname,
                { color: Theme.dark.text, textTransform: "capitalize" },
              ]}
            >
              {user.fullName + ", " + user.age}
            </Text>
            <View style={[styles.row]}>
              <Icon
                name="person-circle-outline"
                size={20}
                color={Theme.dark.text}
              />
              <Text style={[styles.text, { color: Theme.dark.text }]}>
                {user.gender}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="location-outline" size={20} color={Theme.dark.text} />
              <Text style={[styles.text, { color: Theme.dark.text }]}>
                {user.locationName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View>
            <Text
              style={[
                styles.title,
                { color: isDark ? Theme.dark.text : Theme.light.text },
              ]}
            >
              My Bio
            </Text>
            <Text
              style={[
                styles.bio,
                { color: isDark ? Theme.dark.text : Theme.light.text },
              ]}
            >
              {user.bio}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: isDark ? Theme.dark.text : Theme.light.text },
              ]}
            >
              My Interests
            </Text>
            <InterestRender data={user.interest} />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
            gap: 20,
          }}
        >
          {user?.twoBestPics &&
            user?.twoBestPics.map((item, idx) => {
              return (
                <Image
                  key={`${user._id}${idx}`}
                  source={{ uri: item }}
                  style={{
                    width: width * 0.8,
                    height: height * 0.4,
                    borderRadius: 5,
                  }}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height * 0.8,
    width: width * 0.95,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 3,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: height * 0.8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: width * 0.5,
    gap: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "capitalize",
    opacity: 0.8,
  },
  textname: {
    fontSize: 24,
    fontWeight: "900",
    opacity: 0.9,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  detailsContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    opacity: 0.8,
    marginVertical: 10,
  },
});
