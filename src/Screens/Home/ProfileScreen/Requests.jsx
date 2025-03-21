import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import { useSelector } from "react-redux";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import NoData from "../../../Components/NoData";
import CustomUserCard from "../../../Components/CustomUserCard";
const Requests = ({ navigation }) => {
  const { data } = useSelector((store) => store.Requests);
  const { isDark, setIsDark } = useDarkMode();
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
          Requests
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ gap: 14, marginTop: 20 }}>
        {data.length > 0 ? (
          data.map((item) => (
            <CustomUserCard key={item._id} data={item} isRequest={true} />
          ))
        ) : (
          <NoData
            msg="No Request !"
            msg2="Looks like you have no requests at the moment. Start connecting and check back soon!"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
