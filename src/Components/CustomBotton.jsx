import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  children,
  name,
  onPress,
  outline = false,
  style,
  isDisabled = false,
  styleContainer,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.button,
        outline
          ? [{ ...styleContainer }, styles.outlineButton]
          : styles.filledButton,
        { opacity: isDisabled && 0.5 },
        { ...style },
      ]}
    >
      {name && (
        <Text style={[styles.text, outline && styles.outlineText]}>{name}</Text>
      )}
      {children}
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
