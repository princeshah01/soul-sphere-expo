import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
const Contact = ({ navigation }) => {
  const { isDark } = useDarkMode();
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
        <BackButton navigation={navigation} isDark={isDark} />
        <Text
          style={[
            styles.title,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          Support
        </Text>
      </View>

      <Text
        style={{
          fontSize: 20,
          color: isDark ? Theme.dark.text : Theme.light.text,
        }}
      >
        contact info will be here
      </Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
