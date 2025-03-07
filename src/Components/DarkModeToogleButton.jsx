import { Ionicons } from "@expo/vector-icons";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Theme } from "../Constant/Theme";
const DarkModeToggleButton = ({ isDark, setIsDark }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 6,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={30}
          color={isDark && "#fff"}
        />
        <Text
          style={[
            styles.btnText,
            { color: isDark ? Theme.dark.text : Theme.light.text },
          ]}
        >
          Dark Mode
        </Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#fff" }}
        thumbColor={isDark ? "#fff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          setIsDark(!isDark);
        }}
        value={isDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 1.2,
    textTransform: "capitalize",
  },
});

export default DarkModeToggleButton;
