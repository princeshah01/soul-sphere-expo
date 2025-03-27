import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Theme } from "../../../../Constant/Theme";

const CustomEmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <LottieView
      source={require("../../../../../assets/noMessage.json")}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
    <Text style={styles.emptyStateText}>No messages...</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyStateContainer: {
    top: responsiveHeight(25),
    right: responsiveWidth(-28),
    position: "absolute",
  },
  emptyStateText: {
    color: Theme.primary,
    fontSize: responsiveFontSize(3),
    textAlign: "center",
    letterSpacing: 1.1,
    fontWeight: 500,
  },
});

export default CustomEmptyState;
