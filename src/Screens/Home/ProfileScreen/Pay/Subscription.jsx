import { View, Text, ScrollView } from "react-native";
import { useDarkMode } from "../../../../provider/DarkModeProvider";
import { Theme } from "../../../../Constant/Theme";
import React from "react";
import BackButton from "../../../../Components/BackButton";
import SubscriptionCard from "./SubscriptionCard";

const plans = [
  {
    id: "1",
    price: "$9.99",
    duration: "month",
    features: [
      "Unlimited Swiping & Likes",
      "5 Super Likes a Day",
      "Unlimited Rewinds",
      "Remove Restrictions & Ads",
    ],
  },
  {
    id: "2",
    price: "$49.99",
    duration: "6 months",
    features: [
      "Unlimited Swiping & Likes",
      "5 Super Likes a Day",
      "Unlimited Rewinds",
    ],
  },
];

const SubscriptionScreen = ({ navigation }) => {
  const { isDark } = useDarkMode();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <View style={styles.header}>
        <BackButton navigation={navigation} isDark={isDark} />

        <Text
          style={[
            styles.title,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          Get Subscription
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Enjoy unlimited swiping & like, without restrictions, & without ads
        </Text>
        {plans.map((item) => (
          <SubscriptionCard isDark={isDark} plan={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
};
