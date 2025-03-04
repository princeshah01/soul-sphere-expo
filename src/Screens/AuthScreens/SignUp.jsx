import { StyleSheet, Alert, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Logo from "../../Components/Logo.jsx";
import { GradientButton } from "../../Components/Gradient.jsx";
import InputField from "../../Components/InputField.jsx";
import { Theme } from "../../Constant/Theme.js";
import BackButton from "../../Components/BackButton.jsx";
import { useDarkMode } from "../../provider/DarkModeProvider.jsx";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios, { Axios } from "axios";

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
  const [msg, setMsg] = useState("");
  const [fullName, setFullName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);

  function handleName(e) {
    setFullName(e);
    if (e.length == 0) {
      setNameVerify(null);
    } else if (e.length >= 4) {
      setNameVerify(true);
    } else {
      setNameVerify(false);
    }
  }

  function handlePassword(e) {
    setPassword(e);
    if (e.length == 0) {
      setPasswordVerify(null);
    } else if (e.length >= 8) {
      setPasswordVerify(true);
    } else {
      setPasswordVerify(false);
    }
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e);
    if (e.length == 0) {
      setConfirmPasswordVerify(null);
    } else if (e.length >= 8) {
      setConfirmPasswordVerify(true);
    } else {
      setConfirmPasswordVerify(false);
    }
  }
  function handleUsername(e) {
    setUserName(e);
    if (e.length == 0) {
      setUserNameVerify(null);
    } else if (e.length >= 5) {
      setUserNameVerify(true);
    } else {
      setUserNameVerify(false);
    }
  }
  function handleEmail(e) {
    setEmail(e);
    if (e.length == 0) {
      setEmailVerify(null);
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setEmailVerify(true);
    } else {
      setEmailVerify(false);
    }
  }

  const handleSignup = async () => {
    setMsg("");
    if (
      !(
        userNameVerify &&
        emailVerify &&
        passwordVerify &&
        confirmPasswordVerify
      )
    ) {
      setMsg("Please enter valid Details");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://192.168.137.111:3000/signup", {
        userName,
        fullName,
        email,
        password,
      });

      if (response.status == 200) {
        console.log("signup success fully");
        console.log(response.data);
        Alert.alert("Read It Carefully", `${response.data.message}`);
        navigation.navigate("Login");
      }
    } catch (error) {
      setMsg(error?.response?.data?.error);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      edges={["top"]}
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
            Enter your personal Information.
          </Text>
        </View>

        <InputField
          name="Full Name"
          icon="user"
          dataValue={fullName}
          setValue={handleName}
          isDark={isDark}
          verify={userNameVerify}
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

        <Text
          style={{
            textAlign: "center",
            color: "red",
            textTransform: "capitalize",
            fontSize: responsiveFontSize(1.5),
          }}
        >
          {msg}
        </Text>
      </View>
      <GradientButton
        onPress={handleSignup}
        name="Register"
        styleByProp={{
          width: responsiveWidth(90),
          //   marginTop: responsiveHeight(1.8),
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
    fontWeight: 600,
    textAlign: "center",
  },
  textPara: { opacity: 0.7, fontSize: responsiveFontSize(2), marginBottom: 5 },
});
