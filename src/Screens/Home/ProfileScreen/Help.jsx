import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import BackButton from "../../../Components/BackButton";

const FaqCard = ({ item, toggleExpand, expanded, isDark }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.faqItem,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          borderColor: isDark ? Theme.dark.border : Theme.light.border,
        },
      ]}
      onPress={() => toggleExpand(item.id)}
    >
      <View style={styles.questionRow}>
        <Text
          style={[
            styles.question,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          {item.question}
        </Text>
        <Icon
          name={expanded === item.id ? "up" : "down"}
          size={15}
          color={isDark ? Theme.dark.text : Theme.light.text}
        />
      </View>
      {expanded === item.id && (
        <Text
          style={[
            styles.answer,
            { borderColor: isDark ? Theme.dark.border : Theme.light.border },
          ]}
        >
          💁🏼‍♂️ : {item.answer}{" "}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const Help = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);
  const { isDark } = useDarkMode();
  const faqData = [
    {
      id: "1",
      question: "How do I create an account?",
      answer:
        "To create an account, download the app, sign up using your email or phone number, and complete your profile.",
    },
    {
      id: "2",
      question: "How do I edit my profile?",
      answer:
        "Go to the 'Profile' section, tap on 'Edit Profile', and update your details, including bio, photos, and preferences.",
    },
    {
      id: "3",
      question: "How can I match with someone?",
      answer:
        "You can swipe right on profiles you like. If the other person also swipes right, it's a match, and you can start chatting!",
    },
    {
      id: "4",
      question: "How do I report a user?",
      answer:
        "To report a user, go to their profile, tap on the three-dot menu, and select 'Report'. Choose a reason and submit.",
    },
    {
      id: "5",
      question: "How do I delete my account?",
      answer:
        "Go to Settings > Account > Delete Account. Follow the instructions to permanently remove your profile.",
    },
    {
      id: "6",
      question: "How to unsubscribe from premium?",
      answer:
        "To unsubscribe, go to Settings > Subscription, and cancel your plan through the App Store or Google Play Store.",
    },
    {
      id: "7",
      question: "Can I hide my profile from others?",
      answer:
        "Yes, you can enable 'Incognito Mode' in Settings to browse profiles without appearing in recommendations.",
    },
    {
      id: "8",
      question: "How do I change my match preferences?",
      answer:
        "Go to Settings > Match Preferences and update filters like age range, distance, and interests.",
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <View
      style={[
        styles.container,
        isDark && { backgroundColor: Theme.dark.background },
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
          Help Center
        </Text>
      </View>

      <Text
        style={{
          textAlign: "center",
          paddingVertical: 10,
          fontSize: 18,
          fontWeight: 500,
          color: Theme.primary,
        }}
      >
        FAQ
      </Text>

      <FlatList
        data={faqData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FaqCard
            isDark={isDark}
            item={item}
            toggleExpand={toggleExpand}
            expanded={expanded}
          />
        )}
      />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: Theme.light.background },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
  searchInput: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  faqItem: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
  questionRow: { flexDirection: "row", justifyContent: "space-between" },
  question: { fontSize: 16, fontWeight: "bold", width: "85%" },
  answer: {
    borderTopWidth: 0.4,
    marginTop: 5,
    paddingTop: 5,
    fontSize: 14,
    color: "gray",
  },
});
