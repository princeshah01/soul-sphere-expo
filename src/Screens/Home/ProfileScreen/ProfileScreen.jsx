import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import ConfirmLogout from "../../../Components/ConfirmLogoutModal";

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
      <Header
        name="Profile"
        height={5}
        onLogoutPress={() => {
          setModalVisible(true);
        }}
      />
      <View style={{ height: responsiveHeight(50) }}>
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
        {/* background */}
        <View style={[styles.subscriptionView]}>
          <View
            style={{
              width: responsiveWidth(58),
              height: "100%",
            }}
          >
            {/* text */}
            <Text style={styles.subscriptionTitle}>Enjoy All benefits!</Text>
            <Text style={styles.subscriptionText}>
              Enjoy unlimited swiping , like without restrictions & without ads
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
          <View
            style={{
              width: responsiveWidth(20),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* icon */}
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
        <ConfirmLogout
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { height: responsiveHeight(100), backgroundColor: "#fff" },
  profileName: {
    textAlign: "center",
    fontSize: responsiveFontSize(3.5),
    color: "Black",
    fontWeight: 500,
    opacity: 0.8,
  },
  subscriptionView: {
    backgroundColor: Theme.primary,
    flexDirection: "row",
    padding: responsiveFontSize(3),
    alignSelf: "center",
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(2),
    borderRadius: 35,
  },
  subscriptionTitle: {
    fontSize: responsiveFontSize(2.5),
    color: "#fff",
    fontWeight: 700,
  },
  subscriptionText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    width: responsiveWidth(55),
  },
  profileButtons: {
    height: responsiveHeight(40),
    margin: "auto",
    width: responsiveWidth(70),
    alignItems: "flex-Start",
    gap: 15,
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
