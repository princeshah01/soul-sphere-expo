import { StyleSheet, View } from "react-native";
import CustomButton from "../../Components/CustomBotton";
import React from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import axios from "axios";
import env from "../../Constant/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slice/Auth";
import { showToast } from "../../Components/showToast";
import Icon from "@expo/vector-icons/Ionicons";
import { Theme } from "../../Constant/Theme";
import { getJoin } from "../../Store/Slice/Chat";
import { useSelector } from "react-redux";
import LoadingScreen from "../../Components/ShimmerUI/LoadingScreen";
const createFormData = (data) => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (
      key !== "profilePicture" &&
      key !== "twoBestPics" &&
      key !== "locationcoordiantes" &&
      key !== "interest"
    ) {
      formData.append(key, data[key]);
    }
  });

  formData.append("interest", JSON.stringify(data.interest));

  formData.append(
    "locationcoordiantes",
    JSON.stringify(data.locationcoordiantes)
  );

  if (data.profilePicture) {
    formData.append("profilePicture", {
      uri: data.profilePicture,
      name: "profilePicture.jpg",
      type: "image/jpeg",
    });
  }

  if (data.twoBestPics && Array.isArray(data.twoBestPics)) {
    data.twoBestPics.forEach((pic, index) => {
      formData.append("twoBestPics", {
        uri: pic,
        name: `bestPic${index + 1}.jpg`,
        type: "image/jpeg",
      });
    });
  }

  return formData;
};

const FooterProfileSetup = ({
  currentIndex,
  data,
  flatListRef,
  userInfo,
  setCurrentIndex,
}) => {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMsg, successMsg } = useSelector(
    (store) => store.Chat
  );
  const HandleNext = async () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else if (
      !(
        userInfo.gender &&
        userInfo.email &&
        userInfo.dob &&
        userInfo.bio &&
        userInfo.locationcoordiantes.coordinates &&
        userInfo.locationName &&
        userInfo.interest &&
        userInfo.interestIn
      )
    ) {
      showToast(
        "error",
        "All fields are mandatory. You cannot skip any field."
      );
    } else {
      try {
        const token = await AsyncStorage.getItem("token");
        const formData = createFormData(userInfo);
        if (!token) {
          showToast("error", "login again ! invalid Credentials");
        }
        const response = await axios.put(
          `${env.API_BASE_URL}/profilesetup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data && response.status === 200) {
          showToast("success", response?.data?.message);
          const data = response?.data?.UserProfileSetup;
          dispatch(login({ user: data, token }));
          //adding user to stream chat
          dispatch(getJoin(token));
          isError
            ? showToast("error", errorMsg)
            : showToast("success", successMsg);
        }
      } catch (err) {
        console.log(err);
        showToast("error", "Unable to Save data Try Again !!" + err);
      }
    }
  };
  const HandleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View
      style={{
        width: responsiveWidth(75),
        alignSelf: "center",
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-between",
      }}
    >
      <CustomButton
        // name="Back"
        outline={true}
        onPress={HandleBack}
        isDisabled={currentIndex == 0}
      >
        <Icon name="chevron-back-outline" size={20} color={Theme.primary} />
      </CustomButton>

      <CustomButton
        name={
          currentIndex === data.length - 1
            ? isLoading
              ? "Loading"
              : "done"
            : null
        }
        onPress={HandleNext}
      >
        {currentIndex != data.length - 1 && (
          <Icon
            name="chevron-forward-outline"
            size={20}
            color={Theme.light.background}
          />
        )}
      </CustomButton>
    </View>
  );
};

export default FooterProfileSetup;

const styles = StyleSheet.create({});
