import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import { Theme } from "../Constant/Theme";
import { useDarkMode } from "../provider/DarkModeProvider";
import axios from "axios";
import env from "../Constant/env";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";
import { showToast } from "./showToast";
import { useDispatch } from "react-redux";
import { removeRequest } from "../Store/Slice/requests";

const CustomUserCard = ({
  data,
  isRequest = false,
  disable = false,
  toggleIsFav,
  isToggle,
  handleNavigation,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.Auth);
  const handleReqReview = async (status, id) => {
    try {
      let response = await axios.post(
        `${env.API_BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        showToast("success", response.data.message);
        dispatch(removeRequest(data._id));
      }
    } catch (error) {
      // console.log(error?.response?.data);
      showToast("error", error?.response?.data?.message);
    }
  };
  const handleIsFav = async (f) => {
    try {
      let response = await axios.post(
        `${env.API_BASE_URL}/user/${data._id}/${f}`,
        { fullName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        // console.log(response?.data.message);
        showToast("success", response?.data?.message);
        // dispatch();
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const { isDark } = useDarkMode();
  // console.log(data, "userCard");
  const userInfo = isRequest ? data.fromUserId : data?.userInfo;
  const { profilePicture, fullName, age, gender, isfav } = userInfo;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={handleNavigation}
      style={{
        width: width * 0.9,
        height: height * 0.09,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        borderColor: isDark ? Theme.dark.border : Theme.light.border,
        borderRadius: 20,
        borderWidth: 1,
        overflow: "hidden",
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          width: "30%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: profilePicture }}
          resizeMode="cover"
          style={{
            width: "60%",
            height: "90%",
            borderRadius: 40,
          }}
        />
      </View>
      <View
        style={{
          width: "50%",
          height: "100%",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text
            style={[
              styles.text,
              { color: isDark ? Theme.dark.text : Theme.light.text },
            ]}
          >
            {fullName}
          </Text>
          <Text
            style={[
              styles.text,
              {
                opacity: 0.7,
                color: isDark ? Theme.dark.text : Theme.light.text,
              },
            ]}
          >
            {age}
          </Text>
        </View>
        <Text
          style={{
            opacity: 0.7,
            fontSize: 16,
            color: isDark ? Theme.dark.text : Theme.light.text,
          }}
        >
          {gender}
        </Text>
      </View>
      <View
        style={{
          width: "20%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        {isRequest ? (
          <View style={{ flexDirection: "row", gap: 10, marginRight: 40 }}>
            <TouchableOpacity
              onPress={() => {
                handleReqReview("accepted", data._id);
              }}
              style={{
                backgroundColor: Theme.primary,
                padding: 2,
                borderRadius: 50,
                borderColor: Theme.primary,
                borderWidth: 2,
              }}
            >
              <Icon name="checkmark" color={Theme.light.background} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //api call to reject
                handleReqReview("rejected", data._id);
              }}
              style={{
                padding: 2,
                borderRadius: 50,
                borderColor: Theme.primary,
                borderWidth: 2,
              }}
            >
              <Icon name="close" color={Theme.primary} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleIsFav(!isfav);
              toggleIsFav(!isToggle);
            }}
          >
            <Icon
              name={isfav ? "heart" : "heart-outline"}
              size={25}
              color="#fa5a67"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 500,
  },
});

export default CustomUserCard;
