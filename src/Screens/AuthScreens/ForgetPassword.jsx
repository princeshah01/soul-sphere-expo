import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import InputField from "../../Components/InputField.jsx";
import { GradientButton } from "../../Components/Gradient.jsx";
import { Platform } from "react-native";
import { Theme } from "../../Constant/Theme.js";
import BackButton from "../../Components/BackButton.jsx";
import { Snackbar } from "react-native-paper";
import { useDarkMode } from "../../provider/DarkModeProvider.jsx";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";

const ForgetPassword = ({ navigation }) => {
  const { isDark } = useDarkMode();
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const handelForget = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg("Invalid email format");
      return;
    }
    try {
      const response = await axios.post(`${env.API_BASE_URL}/forgetpassword`, {
        email,
      });

      if (response.status == 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
    setVisible(true);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      edges={["top"]}
      style={[
        styles.main,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <View style={{ alignSelf: "center" }}>
        <Image
          source={require("../../../assets/forgetpass.png")}
          style={{
            resizeMode: "center",
            width: responsiveWidth(80),
            height: responsiveHeight(40),
          }}
        />
      </View>
      <BackButton
        isDark={isDark}
        navigation={navigation}
        style={{ position: "absolute", top: 20, left: 20 }}
      />
      <View
        style={{
          padding: 20,
          gap: 10,
          height:
            Platform.OS == "ios" ? responsiveHeight(40) : responsiveHeight(50),
          width: responsiveWidth(100),
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Text
            style={[styles.textTitle, isDark && { color: Theme.dark.text }]}
          >
            Forget Password ?
          </Text>
          <Text style={[styles.textPara, isDark && { color: Theme.dark.text }]}>
            Don't worry! it occurs. please enter the email address linked with
            your account
          </Text>
        </View>
        <InputField
          name="Email"
          icon="mail"
          dataValue={email}
          setValue={setEmail}
          isDark={isDark}
        />
        {msg && (
          <Text style={{ color: "red", textAlign: "center" }}>{msg}</Text>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: responsiveWidth(5),
          }}
        >
          <GradientButton
            onPress={handelForget}
            name="Reset Password"
            disabled={visible}
            styleByProp={{
              width: responsiveWidth(90),
            }}
          />
        </View>
      </View>
      <Snackbar
        visible={visible}
        duration={5000}
        onDismiss={() => {
          navigation.goBack("Login");
          setVisible(false);
        }}
        action={{
          label: "OK",
          onPress: () => {
            setVisible(false);
          },
        }}
        style={{
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          position: "absolute",
          bottom: -responsiveWidth(16),
        }}
        theme={{
          colors: { primary: "red" },
        }}
      >
        <Text style={{ color: isDark ? Theme.dark.text : Theme.light.text }}>
          Reset password link has been sent to your mail. Check your inbox.
        </Text>
      </Snackbar>
    </ScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  main: { width: responsiveWidth(100), height: responsiveHeight(100) },
  textTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 600,
    textAlign: "center",
  },
  textPara: {
    opacity: 0.7,
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
    textAlign: "justify",
  },
});
