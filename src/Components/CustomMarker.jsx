import react from "react";
import { Text, View } from "react-native";
import { Theme } from "../Constant/Theme";
const CustomMarker = ({ currentValue, isDark, showLabel }) => {
  return (
    <View style={{ alignItems: "center" }}>
      {showLabel && (
        <View
          style={{
            backgroundColor: Theme.primary,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: isDark ? Theme.dark.background : Theme.light.background,
              fontSize: 12,
            }}
          >
            {currentValue}
          </Text>
        </View>
      )}

      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderColor: Theme.primary,
          borderWidth: 3,
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        }}
      />
    </View>
  );
};

export default CustomMarker;
