import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import UserCard from "../Userconnections/UserCard";
const Favorite = ({ navigation }) => {
  const data = [];
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
          Favorite matches
        </Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10, marginTop: 20 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          item.isfav && (
            <UserCard user={item} navigation={navigation} isDark={isDark} />
          )
        }
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
