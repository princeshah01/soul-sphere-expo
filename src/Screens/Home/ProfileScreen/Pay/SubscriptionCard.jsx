import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Theme } from "../../../../Constant/Theme";
const { width } = Dimensions.get("window");
const SubscriptionCard = ({ plan, isDark }) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <FontAwesome6
        name="crown"
        size={40}
        color={Theme.primary}
        style={styles.crownIcon}
      />
      <Text
        style={[
          styles.price,
          { color: isDark ? Theme.dark.text : Theme.light.text },
        ]}
      >
        {plan.price}
        <Text
          style={[
            styles.duration,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          / {plan.duration}
        </Text>
      </Text>
      <View
        style={[
          styles.divider,
          { borderColor: isDark ? Theme.dark.border : Theme.light.border },
        ]}
      />
      {plan.features.map((feature, index) => (
        <View key={index} style={styles.featureRow}>
          <FontAwesome6 name="circle-check" size={18} color={Theme.primary} />
          <Text
            style={[
              styles.featureText,
              { color: isDark ? Theme.dark.text : Theme.light.text },
            ]}
          >
            {feature}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: Theme.primary,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    width: width * 0.8,
    alignSelf: "center",
    elevation: 5,
  },
  crownIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  duration: {
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
