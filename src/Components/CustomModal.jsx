import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomButton from "./CustomBotton";

const CustomModal = ({
  visible = false,
  buttonName,
  onPress,
  text1,
  text2,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flex: 1, width: "100%" }}>
            <Text style={styles.header}>{text1}</Text>
            <Text style={styles.para}>{text2}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <CustomButton name="cancel" outline={true} />
            <CustomButton name="Submit" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "palegreen",
  },
  modalView: {
    height: responsiveHeight(30),
    width: responsiveWidth(70),
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 29,
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
  header: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 600,
    letterSpacing: 1.2,
  },
  para: {
    fontSize: responsiveFontSize(2),
    fontWeight: 400,
    letterSpacing: 1.2,
  },
});
