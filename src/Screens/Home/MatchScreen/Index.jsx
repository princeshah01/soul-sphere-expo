import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import CustomUserCard from "../../../Components/CustomUserCard.jsx";
import SearchBar from "../../../Components/SearchBar.jsx";
import Header from "../../ProfileSetup/Header";
import { Theme } from "../../../Constant/Theme.js";
import { useDarkMode } from "../../../provider/DarkModeProvider.jsx";
import useConnections from "../../../hooks/useConnection.js";
import { useSelector } from "react-redux";
import NoData from "../../../Components/NoData.jsx";
import CustomButton from "../../../Components/CustomBotton.jsx";

const { width, height } = Dimensions.get("screen");

const UserConnection = ({ navigation }) => {
  const [IsFavToggle, setIsFavToggle] = useState(false);
  const request = useSelector((store) => store?.Requests?.data);
  const { data } = useConnections(IsFavToggle, request);
  const { isDark } = useDarkMode();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const handleSearch = (q) => {
    setSearch(q);
    const filterd = data.filter((item) => {
      return item?.userInfo?.fullName.toLowerCase().includes(q.toLowerCase());
    });
    setFilteredData(filterd);
  };
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
              {data.length > 0 ? (
                filteredData ? (
                  filteredData.map((item, idx) => (
                    <CustomUserCard
                      isDark={isDark}
                      navigation={navigation}
                      key={idx}
                      data={item}
                      isToggle={IsFavToggle}
                      toggleIsFav={setIsFavToggle}
                      handleNavigation={() => {
                        navigation.navigate("profileView", {
                          userInfo: item.userInfo,
                        });
                      }}
                    />
                  ))
                ) : (
                  data.map((item, idx) => (
                    <CustomUserCard
                      isDark={isDark}
                      navigation={navigation}
                      key={idx}
                      data={item}
                      isToggle={IsFavToggle}
                      toggleIsFav={setIsFavToggle}
                      handleNavigation={() => {
                        navigation.navigate("profileView", {
                          userInfo: item.userInfo,
                        });
                      }}
                    />
                  ))
                )
              ) : (
                <NoData
                  msg="No matches yet?"
                  msg2="Don’t rush! great things take time. Your person is coming! ❤"
                >
                  <CustomButton
                    name="Explore Now"
                    outline={true}
                    onPress={() => {
                      navigation.jumpTo("Feed");
                    }}
                  />
                </NoData>
              )}
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
