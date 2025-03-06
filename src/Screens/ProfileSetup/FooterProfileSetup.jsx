import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../../Components/CustomBotton";
import React from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import axios from "axios";
import env from "../../Constant/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slice/Auth";

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
const clearAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("App data cleared");
  } catch (e) {
    console.error("Failed to clear app data", e);
  }
};
const FooterProfileSetup = ({
  currentIndex,
  data,
  flatListRef,
  userInfo,
  navigation,
}) => {
  const dispatch = useDispatch();
  const HandleNext = async () => {
    console.log(currentIndex + "component index");
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      const nextOffset = nextIndex * responsiveWidth(100);

      flatListRef.current.scrollToOffset({
        offset: nextOffset,
        animated: true,
      });
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
      Alert.alert(
        "Incomplete Information",
        "All fields are mandatory. You cannot skip any field."
      );
    } else {
      // clearAppData();
      try {
        const token = await AsyncStorage.getItem("token");
        const formData = createFormData(userInfo);
        if (!token) {
          console.log("login again ! invalid Credentials");
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
        if (response?.data) {
          const data = response?.data?.UserProfileSetup;
          dispatch(login({ user: JSON.stringify(data), token }));
          await AsyncStorage.setItem("user", JSON.stringify(data));
          // navigation.replace("Home");
          console.log("response" + JSON.stringify(data), "token " + token);
        } else {
          console.log("failed to retrive data or save data");
        }
      } catch (err) {
        console.log("error" + err);
      }
    }
  };
  const HandleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0 && flatListRef?.current) {
      const prevOffset = prevIndex * responsiveWidth(100);

      flatListRef.current.scrollToOffset({
        offset: prevOffset,
        animated: true,
      });
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
        name="Back"
        outline={true}
        onPress={HandleBack}
        isDisabled={currentIndex == 0}
      />

      <CustomButton
        name={currentIndex == data.length - 1 ? "Done" : "Next"}
        onPress={HandleNext}
      />
    </View>
  );
};

export default FooterProfileSetup;

const styles = StyleSheet.create({});
