import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProfileImage from "../../../Components/ProfileSetup/ProfileImage";
import CustomButton from "../../../Components/CustomBotton";
import CustomProfileBtn from "../../../Components/ProfileSetting/CustomProfileBtn";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import Header from "../../ProfileSetup/Header";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import env from "../../../Constant/env";
import { addRequests } from "../../../Store/Slice/requests";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.Auth);
  const { data } = useSelector((store) => store.Requests);
  const { fullName, profilePicture } = user;
  const { isDark } = useDarkMode();

  const fetchRequestData = useCallback(async () => {
    try {
      let response = await axios.get(
        env.API_BASE_URL + "/user/requests/received",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        if (response?.data?.data?.length > 0) {
          dispatch(addRequests(response?.data?.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchRequestData();
    }, [fetchRequestData])
  );
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
      <Header name="Profile" />
      <View style={{ height: height * 0.4, backgroundColor: "transparent" }}>
        <ProfileImage profilePicture={profilePicture} size={150} />
        {/* profile address */}
        <Text
          style={[
            styles.profileName,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          {fullName}
        </Text>
        <View style={styles.subscriptionView}>
          <View style={{ width: "80%", marginTop: 10 }}>
            <Text style={styles.subscriptionTitle}>Enjoy All benefits!</Text>
            <Text style={styles.subscriptionText}>
              Enjoy unlimited swiping . like , without restrictions , & without
              ads
            </Text>
            <CustomButton
              outline={true}
              styleContainer={{ backgroundColor: Theme.light.background }}
              onPress={() => {
                navigation.navigate("Pay");
              }}
              name="Get Vip"
              style={{
                alignSelf: "flex-start",
                marginTop: 10,
                borderRadius: 40,
              }}
            />
          </View>
          <View style={{ width: "30%" }}>
            <MaterialCommunityIcons
              name="crown-outline"
              size={80}
              color="#FFD700"
            />
          </View>
        </View>
      </View>
      <View style={styles.profileButtons}>
        <CustomProfileBtn
          onPress={() => {
            navigation.navigate("ProfileInfo");
          }}
          iconName="profile"
          name="Profile"
          isDark={isDark}
        />
        <CustomProfileBtn
          iconName="hearto"
          name="favorite"
          onPress={() => {
            navigation.navigate("Favorite");
          }}
          isDark={isDark}
        />
        <CustomProfileBtn
          onPress={() => {
            navigation.navigate("Requests");
          }}
          iconName="adduser"
          name="Requests"
          isDark={isDark}
          notify={data.length > 0 ? true : false}
          notifycount={data.length}
        />
        <CustomProfileBtn
          onPress={() => {
            navigation.navigate("Setting");
          }}
          iconName="setting"
          name="Settings"
          isDark={isDark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { height, backgroundColor: "#fff" },
  headerView: {
    height: height * 0.08,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitleView: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerTitle: { fontSize: 22, fontWeight: "600", letterSpacing: 1.5 },

  profileName: {
    textAlign: "center",
    fontSize: 28,
    color: "Black",
    fontWeight: 600,
    opacity: 0.8,
  },
  subscriptionView: {
    backgroundColor: Theme.primary,
    flexDirection: "row",
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 20,

    borderRadius: 35,
  },
  subscriptionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: 700,
  },
  subscriptionText: {
    color: "#fff",
    fontSize: 14,
    width: width * 0.5,
  },
  profileButtons: {
    margin: "auto",
    marginTop: width * 0.25,
    width: width * 0.7,
    alignItems: "flex-Start",
    gap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: width * 0.8,
    height: height * 0.23,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProfileScreen;

// {
//   "email":"prince@ids.com" ,
//    "password":"123456789@Pr"
// }
// {
//    "email":"marilou.martin@example.com" ,
//     "password":"123456789@Pr"
// }
// {
//    "email":"rose.roger@example.com" ,
//     "password":"123456789@Pr"
// }
// {
//    "email":"sefanja.pors@example.com" ,
//     "password":"123456789@Pr"
// }
// {
//    "email":"consuelo.ruiz@example.com" ,
//     "password":"123456789@Pr"
// }
// {
//    "email":"caleb.vargas@example.com" ,
//     "password":"123456789@Pr"
// }
