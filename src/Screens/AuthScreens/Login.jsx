import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../Components/Logo.jsx";
import { GradientButton } from "../../Components/Gradient.jsx";
import InputField from "../../Components/InputField.jsx";
import SocialButton from "../../Components/SocialButton.jsx";
import { Theme } from "../../Constant/Theme.js";
import { useDarkMode } from "../../provider/DarkModeProvider.jsx";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slice/Auth.jsx";
import axios from "axios";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isDark } = useDarkMode();
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(null);

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

  const [msg, setMsg] = useState(""); // from api get data

  const handleLogin = async () => {
    if (!emailVerify || !passwordVerify) {
      setMsg("Please enter valid email and password");
      return;
    }

    setMsg("");

    try {
      const response = await axios.post("http://192.168.137.111:3000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("form login ", data.user);
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.user);
        dispatch(login({ user: data.user, token: data.token }));
        Alert.alert("Success", `${data.msg}`);
      } else {
        console.log("data from login", response.data);
        setMsg("Invalid credentials");
      }
    } catch (error) {
      console.warn("Login Error:", error.response.data);
      setMsg(error.response?.data?.error || "Something went wrong");
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

      <View style={{ width: "90%", gap: 12, marginTop: 30 }}>
        <View style={{ alignSelf: "center" }}>
          <Text
            style={[styles.textTitle, isDark && { color: Theme.dark.text }]}
          >
            Login
          </Text>
          <Text style={[styles.textPara, isDark && { color: Theme.dark.text }]}>
            Login to continue using the app
          </Text>
        </View>

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
          dataValue={password}
          setValue={handlePassword}
          isPassword={true}
          icon="lock"
          isDark={isDark}
          verify={passwordVerify}
        />
        {msg && (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              textTransform: "capitalize",
            }}
          >
            {msg}
          </Text>
        )}
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginVertical: 5 }}
          onPress={() => {
            navigation.navigate("Forget");
          }}
        >
          <Text style={{ color: Theme.primary }}>Forgot password ?</Text>
        </TouchableOpacity>

        <GradientButton
          name="Login"
          wi={responsiveWidth(90)}
          onPress={handleLogin}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 20,
          }}
        >
          <SocialButton name="google" color="green" isDark={isDark} />
          <SocialButton name="facebook" color="blue" isDark={isDark} />
          <SocialButton name="apple" color="black" isDark={isDark} />
        </View>

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text style={isDark && { color: Theme.dark.text }}>
            Don't have account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
            style={{ alignSelf: "flex-end", marginVertical: 5 }}
          >
            <Text style={{ color: Theme.primary }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: 10,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  logo: {
    marginTop: responsiveHeight(5),
    borderRadius: 100,
    borderWidth: 5,
    padding: 15,
    borderColor: Theme.primary,
    alignItems: "center",
  },
  textTitle: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 600,
    textAlign: "center",
  },
  textPara: { opacity: 0.7, fontSize: responsiveFontSize(2), marginBottom: 5 },
});
