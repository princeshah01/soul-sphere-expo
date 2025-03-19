import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { OtpInput } from "react-native-otp-entry";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useDarkMode } from "../../provider/DarkModeProvider";
import { Theme } from "../../Constant/Theme";
import CustomButton from "../../Components/CustomBotton";
import { showToast } from "../../Components/showToast";
import axios from "axios";
import env from "../../Constant/env";

const OTPVerification = ({ navigation, route }) => {
  const { email } = route.params || {};
  console.log("🚀 ~ OTPVerification ~ email:", email);
  const otpRef = useRef("");
  const [isLoading, setIsloading] = useState(false);
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
        navigation.replace("Login");
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
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.main,
          {
            backgroundColor: isDark
              ? Theme.dark.background
              : Theme.light.background,
          },
        ]}
      >
        <Image
          style={styles.imageContainer}
          source={require("../../../assets/otp.png")}
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
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <CustomButton
              name="Skip"
              outline={true}
              onPress={() => {
                navigation.replace("Login");
              }}
            />

            <CustomButton name="Verify" onPress={verifyOTP} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
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
