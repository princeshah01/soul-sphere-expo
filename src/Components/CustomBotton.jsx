import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ name, onPress, outline = false, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        outline ? styles.outlineButton : styles.filledButton,
        { ...style },
      ]}
    >
      <Text style={[styles.text, outline && styles.outlineText]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filledButton: {
    backgroundColor: "#a83ef5",
    borderColor: "#a83ef5",
  },
  outlineButton: {
    backgroundColor: "white",
    borderColor: "#a83ef5",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  outlineText: {
    color: "#a83ef5",
  },
});
