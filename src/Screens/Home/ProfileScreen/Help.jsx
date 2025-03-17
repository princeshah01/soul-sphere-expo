import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import BackButton from "../../../Components/BackButton";
import axios from "axios";
import env from "../../../Constant/env";
import { useSelector } from "react-redux";
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
  const token = useSelector((store) => store.Auth.token);
  const [expanded, setExpanded] = useState(null);
  const { isDark } = useDarkMode();
  const [faqData, setFaqData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getFaqData = async () => {
      try {
        const response = await axios.get(env.API_BASE_URL + "/faq", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFaqData(response.data.faqData);
        setIsLoading(false);
      } catch (err) {
        console.log(err + "while fetching data");
      }
    };
    getFaqData();
  }, []);

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
          paddingVertical: 20,
          fontSize: 18,
          fontWeight: 500,
          color: Theme.primary,
        }}
      >
        FAQ
      </Text>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: isDark
              ? Theme.dark.background
              : Theme.light.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={30} />
        </View>
      ) : (
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
      )}
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
