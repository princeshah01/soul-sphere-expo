import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import CustomUserCard from "../../../Components/CustomUserCard";
import CustomButton from "../../../Components/CustomBotton";
import NoData from "../../../Components/NoData";
import Icon from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "../../../Store/Slice/ConnectionSlice";
import { useFocusEffect } from "@react-navigation/native";
import Error from "../../../Components/Error";
import ConnectionsLoading from "../../../Components/ShimmerUI/ConnectionsLoading";
const Favorite = ({ navigation }) => {
  const [IsFavToggle, setIsFavToggle] = useState(false);
  const { token } = useSelector((store) => store.Auth);
  const { data, isLoading, errorMsg, isError } = useSelector(
    (store) => store.Connection
  );
  const { isDark } = useDarkMode();
  const dispatch = useDispatch();
  const [isFavData, setIsFavData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      dispatch(getConnections(token));
    }, [token, IsFavToggle])
  );

  useEffect(() => {
    const favData = data?.filter((item) => item?.userInfo?.isfav);
    setIsFavData(favData || []);
  }, [data]);
  return (
    <View
      style={{
        flex: 1,
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
      {isLoading ? (
        <ConnectionsLoading />
      ) : isError ? (
        <Error errorMsg={errorMsg} />
      ) : isFavData.length > 0 ? (
        <FlatList
          data={isFavData}
          contentContainerStyle={{
            gap: 10,
            marginTop: 20,
            alignItems: "center",
          }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CustomUserCard
              data={item}
              navigation={navigation}
              handleNavigation={() => {
                navigation.navigate("ProfileViewFav", {
                  userInfo: item,
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
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
