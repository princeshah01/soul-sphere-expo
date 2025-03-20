import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import { OtpInput } from "react-native-otp-entry";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomButton from "../../../Components/CustomBotton";
import { showToast } from "../../../Components/showToast";
import axios from "axios";
import env from "../../../Constant/env";
import { useSelector, useDispatch } from "react-redux";
import { updateIsVerified } from "../../../Store/Slice/Auth";

const VerifyAccount = ({ navigation }) => {
  const { email } = useSelector((store) => store.Auth.user);
  const dispatch = useDispatch();
  console.log("🚀 ~ OTPVerification ~ email:", email);
  const otpRef = useRef("");
  // const [isLoading, setIsloading] = useState(false);
  const { isDark } = useDarkMode();
  const verifyOTP = async () => {
    if (!email) {
      showToast("error", "invalid Email");
      navigation.replace("Login");
      return;
    }
    if (otpRef.current.length !== 4) {
      showToast("error", "OTP should be of 4 digit");
      return;
    }
    try {
      const otp = otpRef.current;
      let response = await axios.post(`${env.API_BASE_URL}/verify-otp`, {
        email: email,
        otp: otp,
      });
      console.log(response.data);
      if (response.status === 200) {
        showToast("success", response?.data?.message);
        dispatch(updateIsVerified());
        navigation.goBack();
      }
    } catch (err) {
      showToast("error", err?.response?.data?.message);
    }
  };
  const resendOtp = async () => {
    if (!email) {
      showToast("error", "invalid Email");
      navigation.replace("Login");
      return;
    }
    try {
      let response = await axios.post(`${env.API_BASE_URL}/send-otp`, {
        email,
      });
      if (response.status === 200) {
        showToast("success", response?.data?.message);
      }
    } catch (err) {
      console.log(err);
      showToast("error", err?.response?.data?.message);
    }
  };
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
          Verify account
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Image
          style={styles.imageContainer}
          source={require("../../../../assets/otp.png")}
          resizeMode="contain"
        />
        <View style={styles.contentContainer}>
          <View style={{ width: "90%" }}>
            <Text style={styles.headerText}>OTP verification</Text>
            <Text style={styles.para}>
              Enter the 4-digit OTP sent to your email.
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OtpInput
              onTextChange={(value) => {
                otpRef.current = value;
              }}
              numberOfDigits={4}
              focusColor={Theme.primary}
              placeholder="****"
              type="numeric"
              theme={{
                pinCodeContainerStyle: {
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                },
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Text>If you didn't receive it, </Text>
              <TouchableOpacity onPress={resendOtp}>
                <Text style={{ color: Theme.primary }}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View />
          <View
            style={{
              width: "80%",
            }}
          >
            <CustomButton name="Verify" onPress={verifyOTP} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
  main: {
    height: responsiveHeight(97),
    width: responsiveWidth(100),
    padding: responsiveWidth(5),
    alignItems: "center",
  },
  imageContainer: {
    height: responsiveHeight(40),
    width: responsiveWidth(80),
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  otpContainer: {
    width: "70%",
    gap: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: responsiveFontSize(3),
    fontWeight: 600,
    textAlign: "center",
  },
  para: {
    fontSize: responsiveFontSize(2),
    opacity: 0.7,
  },
});
