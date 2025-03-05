import { StyleSheet, View } from "react-native";
import CustomButton from "../../Components/CustomBotton";
import React from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";

const FooterProfileSetup = ({ currentIndex, data, flatListRef }) => {
  const HandleNext = () => {
    console.log(currentIndex + "component index");
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      const nextOffset = nextIndex * responsiveWidth(100);

      flatListRef.current.scrollToOffset({
        offset: nextOffset,
        animated: true,
      });
    }
  };
  const HandleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0 && flatListRef?.current) {
      const prevOffset = prevIndex * responsiveWidth(100);

      flatListRef.current.scrollToOffset({
        offset: prevOffset,
        animated: true,
      });
    }
  };

  return (
    <View
      style={{
        width: responsiveWidth(75),
        alignSelf: "center",
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-between",
      }}
    >
      <CustomButton
        name="Back"
        outline={true}
        onPress={HandleBack}
        isDisabled={currentIndex == 0}
      />

      <CustomButton
        name={currentIndex == data.length - 1 ? "Done" : "Next"}
        onPress={HandleNext}
      />
    </View>
  );
};

export default FooterProfileSetup;

const styles = StyleSheet.create({});
