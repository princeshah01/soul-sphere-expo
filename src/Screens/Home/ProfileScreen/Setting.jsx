import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import CustomProfileBtn from "../../../Components/ProfileSetting/CustomProfileBtn";
import DarkModeToggleButton from "../../../Components/DarkModeToogleButton";
import { useDispatch, useSelector } from "react-redux";
// import CustomButton from "../../../Components/CustomBotton";
// import {
//   updateIsVerified,
//   updateNotIsVerified,
// } from "../../../Store/Slice/Auth";
const Setting = ({ navigation }) => {
  const { isDark, setIsDark } = useDarkMode();
  const { isVerified } = useSelector((store) => store.Auth.user);
  const dispatch = useDispatch();
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
          Settings
        </Text>
      </View>

      <View style={{ gap: 20, marginTop: 20 }}>
        <DarkModeToggleButton isDark={isDark} setIsDark={setIsDark} />

        <CustomProfileBtn
          iconName="check"
          name="Verify Account"
          onPress={() => {
            navigation.navigate("VerifyAccount");
          }}
          isDark={isDark}
          isVerified={isVerified}
        />
        <CustomProfileBtn
          iconName="info"
          name="About"
          onPress={() => {
            navigation.navigate("About");
          }}
          isDark={isDark}
        />
        <CustomProfileBtn
          iconName="customerservice"
          name="Support"
          onPress={() => {
            navigation.navigate("Contact");
          }}
          isDark={isDark}
        />
        <CustomProfileBtn
          onPress={() => {
            navigation.navigate("Help");
          }}
          iconName="question"
          name="Help"
          isDark={isDark}
        />
        {/* <CustomButton
          name="reset verify"
          onPress={() => {
            dispatch(updateNotIsVerified());
          }}
        /> */}
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
