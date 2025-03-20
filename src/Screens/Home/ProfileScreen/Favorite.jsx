import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import CustomUserCard from "../../../Components/CustomUserCard";
import CustomButton from "../../../Components/CustomBotton";
import useConnections from "../../../hooks/useConnection";
import NoData from "../../../Components/NoData";
import Icon from "@expo/vector-icons/Ionicons";

const Favorite = ({ navigation }) => {
  const [IsFavToggle, setIsFavToggle] = useState(false);
  const { data } = useConnections(IsFavToggle);
  const { isDark } = useDarkMode();

  const [isFavData, setIsFavData] = useState([]);
  useEffect(() => {
    const favData = data.filter((item) => item.userInfo.isfav);
    setIsFavData(favData);
  }, [data]);
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
      {isFavData.length > 0 ? (
        <FlatList
          data={isFavData}
          contentContainerStyle={{ gap: 10, marginTop: 20 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CustomUserCard
              data={item}
              navigation={navigation}
              handleNavigation={() => {
                navigation.navigate("ProfileViewFav", {
                  userInfo: item.userInfo,
                });
              }}
              isDark={isDark}
              toggleIsFav={setIsFavToggle}
              isToggle={IsFavToggle}
            />
          )}
        />
      ) : (
        <NoData
          msg="No favorites yet?"
          msg2="your heart’s waiting for a connection! Add some favorites and make it beat faster"
        >
          <CustomButton
            outline={true}
            onPress={() => {
              navigation.jumpTo("Match");
            }}
          >
            <Icon name="person-add-outline" color={Theme.primary} size={20} />
          </CustomButton>
        </NoData>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
