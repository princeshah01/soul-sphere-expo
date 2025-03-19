import { StyleSheet, Alert, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Logo from "../../Components/Logo.jsx";
import { GradientButton } from "../../Components/Gradient.jsx";
import InputField from "../../Components/InputField.jsx";
import { Theme } from "../../Constant/Theme.js";
import BackButton from "../../Components/BackButton.jsx";
import { useDarkMode } from "../../provider/DarkModeProvider.jsx";
import env from "../../Constant/env.js";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { showToast } from "../../Components/showToast.jsx";
import CustomModal from "../../Components/CustomModal.jsx";

const Signup = ({ navigation }) => {
  const { isDark } = useDarkMode();
  const [userName, setUserName] = useState("");
  const [userNameVerify, setUserNameVerify] = useState(null);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(null);
  const [fullName, setFullName] = useState("");
  const [nameVerify, setNameVerify] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleName(e) {
    setFullName(e);
    setNameVerify(e.length >= 4 ? true : e.length === 0 ? null : false);
  }
  function HandleModal() {
    if (
      !userNameVerify ||
      !emailVerify ||
      !passwordVerify ||
      !confirmPasswordVerify ||
      !nameVerify
    ) {
      showToast("error", "Please enter valid details!");
      return;
    }

    if (password !== confirmPassword) {
      showToast("error", "Passwords do not match!");
      return;
    }

    setModalVisible(!modalVisible);
  }
  function handlePassword(e) {
    setPassword(e);
    setPasswordVerify(e.length >= 8 ? true : e.length === 0 ? null : false);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e);
    setConfirmPasswordVerify(
      e.length >= 8 ? true : e.length === 0 ? null : false
    );
  }

  function handleUsername(e) {
    setUserName(e);
    setUserNameVerify(e.length >= 5 ? true : e.length === 0 ? null : false);
  }

  function handleEmail(e) {
    setEmail(e);
    setEmailVerify(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
        ? true
        : e.length === 0
        ? null
        : false
    );
  }

  const handleSignup = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${env.API_BASE_URL}/signup`, {
        userName,
        fullName,
        email,
        password,
      });

      if (response.status === 200) {
        // console.log("Signup successful", response.data);
        showToast(
          "success",
          response.data.message2 || "Account created successfully!"
        );
        navigation.replace("OTPVerification", { email });
      }
    } catch (error) {
      // console.error("Signup Error:", error.response?.data || error.message);

      if (error.response) {
        showToast("error", error.response?.data?.error || "Signup failed!");
      } else {
        showToast("error", "Network error! Check your internet connection.");
      }
    } finally {
      setModalVisible(false);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
        styles.main,
      ]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.logo}>
        <Logo size="80" />
      </View>
      <CustomModal
        visible={modalVisible}
        btn2="continue"
        onPressBtn1={() => {
          setModalVisible(false);
        }}
        onPressBtn2={handleSignup}
        text1="Are you Sure?"
        text2={`you want to sign up with ${email} ? we will be sending verification code to your email to verify !!`}
      />
      <BackButton
        isDark={isDark}
        navigation={navigation}
        style={{ position: "absolute", top: 20, left: 20 }}
      />

      <View style={styles.innerContainer}>
        <View style={{ alignSelf: "center" }}>
          <Text
            style={[styles.textTitle, isDark && { color: Theme.dark.text }]}
          >
            Register
          </Text>
          <Text style={[styles.textPara, isDark && { color: Theme.dark.text }]}>
            Enter your personal information.
          </Text>
        </View>

        <InputField
          name="Full Name"
          icon="user"
          dataValue={fullName}
          setValue={handleName}
          isDark={isDark}
          verify={nameVerify}
        />
        <InputField
          name="Username"
          icon="user"
          dataValue={userName}
          setValue={handleUsername}
          isDark={isDark}
          verify={userNameVerify}
        />
        <InputField
          name="Email"
          icon="mail"
          dataValue={email}
          setValue={handleEmail}
          isDark={isDark}
          verify={emailVerify}
        />
        <InputField
          name="Password"
          isPassword={true}
          icon="lock"
          dataValue={password}
          setValue={handlePassword}
          isDark={isDark}
          verify={passwordVerify}
        />
        <InputField
          name="Confirm Password"
          isPassword={true}
          icon="lock"
          dataValue={confirmPassword}
          setValue={handleConfirmPassword}
          isDark={isDark}
          verify={confirmPasswordVerify}
        />
      </View>

      <GradientButton
        onPress={HandleModal}
        name="Register"
        disabled={loading}
        styleByProp={{
          width: responsiveWidth(90),
          marginTop: responsiveHeight(1.8),
        }}
      />
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  logo: {
    marginTop: responsiveWidth(5),
    borderRadius: 100,
    borderWidth: 5,
    padding: 15,
    borderColor: Theme.primary,
    alignItems: "center",
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  innerContainer: {
    width: "90%",
    gap: 10,
    height: "75%",
    marginTop: 20,
  },
  textTitle: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: "600",
    textAlign: "center",
  },
  textPara: {
    opacity: 0.7,
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
  },
});
