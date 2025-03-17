import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../Components/BackButton";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import { Theme } from "../../../Constant/Theme";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { GradientButton } from "../../../Components/Gradient";
import axios from "axios";
import env from "../../../Constant/env";
import { showToast } from "../../../Components/showToast";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import CustomModal from "../../../Components/CustomModal";
const Contact = ({ navigation }) => {
  const [modalView, setModalView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [IssueTypes, setIssueTypes] = useState(null);
  const [issueText, setIssueText] = useState("");
  const [SelectedIssue, setSelectedIssue] = useState("");
  // console.log(SelectedIssue + " : issue type form contact.jsx");
  // console.log(issueText + " : issue text from contact.jsx");
  const token = useSelector((store) => store.Auth.token);
  async function getIssueType() {
    try {
      let res = await axios.get(env.API_BASE_URL + "/issueType");
      if (res.status === 200 && res.data) {
        setIssueTypes(res?.data?.data);
        setIsLoading(false);
      }
    } catch (err) {
      showToast("error", "Fetching data error " + err.message);
    }
  }
  useEffect(() => {
    getIssueType();
  }, []);
  const { isDark } = useDarkMode();
  const handleSubmit = () => {
    if (!issueText || !SelectedIssue) {
      showToast(
        "error",
        "Must Select IssueType and must Write Issue in TextBox"
      );
    } else {
      setModalView(true);
    }
  };
  const SubmitIssue = async () => {
    if (!issueText || !SelectedIssue) {
      showToast(
        "error",
        "Must Select IssueType and must Write Issue in TextBox"
      );
    } else {
      try {
        let response = await axios.post(
          env.API_BASE_URL + "/support",
          {
            message: issueText,
            issueType: SelectedIssue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status == 200 && response?.data) {
          showToast("success", response?.data?.message);
        } else {
          showToast("error", "someThing went wrong");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setModalView(false);
        setSelectedIssue("");
        setIssueText("");
      }
    }
  };
  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <CustomModal
        visible={modalView}
        onPressBtn1={setModalView}
        onPressBtn2={SubmitIssue}
        text1="Confirm Your Issue Submission"
        text2={`Are you sure you want to submit this issue? Our support team will review your request and respond as soon as possible.`}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <BackButton navigation={navigation} isDark={isDark} />
          <Text
            style={[
              styles.title,
              { color: isDark ? Theme.dark.text : Theme.light.text },
            ]}
          >
            Support
          </Text>
        </View>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            navigation.navigate("HelpHistory");
          }}
        >
          <Text style={{ color: Theme.primary }}>Help History</Text>
        </TouchableOpacity>
      </View>
      <View
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
          flex: 1,
          justifyContent: "",
        }}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(2.1),
            fontWeight: 600,
            color: isDark ? Theme.light.border : Theme.dark.border,
          }}
        >
          Issue Type
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            paddingVertical: responsiveHeight(2),
          }}
        >
          {IssueTypes &&
            IssueTypes.map((item, idx) => {
              return item === SelectedIssue ? (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIssue(null);
                  }}
                  style={{
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 15,
                    borderColor: Theme.primary,
                    backgroundColor: Theme.primary,
                  }}
                  key={`${idx}${item}`}
                >
                  <Text
                    style={{
                      color: isDark
                        ? Theme.dark.background
                        : Theme.light.background,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIssue(item);
                  }}
                  style={{
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 15,
                    borderColor: Theme.primary,
                  }}
                  key={`${idx}${item}`}
                >
                  <Text style={{ color: Theme.primary }}>{item}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <View
          style={{
            height: responsiveHeight(38),
            justifyContent: "space-around",
          }}
        >
          <View />
          <View
            style={{
              borderWidth: 3,
              height: responsiveHeight(20),
              borderRadius: 20,
              overflow: "hidden",
              borderColor: isDark ? Theme.dark.border : Theme.light.border,

              padding: 10,
            }}
          >
            <TextInput
              multiline={true}
              numberOfLines={10}
              maxLength={100}
              style={{
                fontSize: responsiveFontSize(2),
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: isDark ? Theme.dark.text : Theme.light.text,
              }}
              placeholder="Facing an issue? Let us know!"
              placeholderTextColor={
                isDark ? Theme.dark.text + "99" : Theme.light.text + "99"
              }
              value={issueText}
              onChangeText={setIssueText}
            />
          </View>
          <GradientButton name="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  backButton: { backgroundColor: "#F5F7F8", padding: 5, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "600", marginLeft: 15 },
});
