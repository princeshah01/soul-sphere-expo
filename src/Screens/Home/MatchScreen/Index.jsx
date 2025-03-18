import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomUserCard from "../../../Components/CustomUserCard.jsx";
import SearchBar from "../../../Components/SearchBar.jsx";
import Header from "../../ProfileSetup/Header";
import { Theme } from "../../../Constant/Theme.js";
import { useDarkMode } from "../../../provider/DarkModeProvider.jsx";
import axios from "axios";
const { width, height } = Dimensions.get("screen");
import env from "../../../Constant/env.js";
import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../../../Store/Slice/ConnectionSlice.jsx";
const UserConnection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.Connection);
  const { token } = useSelector((store) => store.Auth);
  const getConnections = async () => {
    try {
      let response = await axios.get(`${env.API_BASE_URL}/user/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(addConnection(response?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const { isDark } = useDarkMode();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const handleSearch = (q) => {
    setSearch(q);
    const filterd = data.filter((item) => {
      return item?.data?.fullName.toLowerCase().includes(q.toLowerCase());
    });
    setFilteredData(filterd);
  };
  //   console.log("main Data >>>>>>>>>>>>>>>>>", mainData);
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <Header name="Matches" isLogout={false} height={5} />
      <View style={{ height: height * 0.95, width: width }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: height * 0.02,
          }}
        >
          <SearchBar
            isDark={isDark}
            handleSearch={handleSearch}
            search={search}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerView}>
            <View style={{ gap: 10, marginTop: 10 }}>
              {filteredData
                ? filteredData.map((item, idx) => (
                    <CustomUserCard
                      isDark={isDark}
                      navigation={navigation}
                      key={idx}
                      data={item}
                    />
                  ))
                : data.map((item, idx) => (
                    <CustomUserCard
                      isDark={isDark}
                      navigation={navigation}
                      key={idx}
                      data={item}
                    />
                  ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height,
    backgroundColor: "#fff",
  },
  innerView: {
    height: "100%",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  text: {
    fontSize: 18,
  },
  headerTitleView: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: "600", letterSpacing: 1.5 },
});

export default UserConnection;
