import { View, Text, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomButton from "./CustomBotton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logoutStream } from "../service/ChatService";
import { logout } from "../Store/Slice/Auth";
const ConfirmLogout = ({ navigation, setModalVisible, modalVisible }) => {
  const dispatch = useDispatch();
  const HandleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout());
      logoutStream();
      // console.log("App data cleared");
    } catch (e) {
      console.error("Failed to clear app data", e);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            <Text style={styles.modalText}>
              Are you sure you want to log out? Your matches might miss you! ☹
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <CustomButton
                name="Cancel"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <CustomButton
                name="Logout"
                outline={true}
                onPress={HandleLogout}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "palegreen",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    height: responsiveHeight(20),
    width: responsiveWidth(70),
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 29,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: responsiveFontSize(2),
  },
});

export default ConfirmLogout;
