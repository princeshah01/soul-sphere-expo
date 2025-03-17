import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import axios from "axios";
import env from "../../../Constant/env";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import IssueData from "../../../Components/IssueData";
import { responsiveFontSize } from "react-native-responsive-dimensions";
const HelpHistory = ({ navigation }) => {
  const { isDark } = useDarkMode();
  const token = useSelector((store) => store.Auth.token);
  const [historyData, setHistoryData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const getData = async () => {
    try {
      let response = await axios.get(env.API_BASE_URL + "/helphistory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.status == 200) {
        // console.log(response.data);
        setHistoryData(response.data.historyData);
      }
    } catch (error) {
      //   console.log(error.response.data);
      setMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
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
        <View style={{ flexDirection: "row" }}>
          <BackButton navigation={navigation} isDark={isDark} />
          <Text
            style={[
              styles.title,
              { color: isDark ? Theme.dark.text : Theme.light.text },
            ]}
          >
            Help History
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {Loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={30} />
          </View>
        ) : historyData.length >= 1 ? (
          historyData.map((data) => {
            return <IssueData key={data._id} data={data} />;
          })
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: responsiveFontSize(2) }}>{msg}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HelpHistory;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
