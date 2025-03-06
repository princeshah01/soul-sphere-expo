import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider.jsx";
import Icon from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { lightMapStyle, darkMapStyle } from "../../../Constant/MapStyle.js";
const LocationPicker = ({ setUserInfo }) => {
  const { isDark } = useDarkMode();
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useRef(null);
  const [latitude, setlatitude] = useState(30.72301964935838);
  const [longitude, setlongitude] = useState(76.8475926215257);
  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      locationName: searchValue,
    }));
  }, [searchValue]);
  const searchLocation = async () => {
    if (!searchValue.trim()) {
      return;
    }
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}`,
        {
          headers: {
            "User-Agent": "ProjectDemo/1.0 ",
            "Accept-Language": "en",
          },
        }
      );
      if (res.data.length > 0) {
        setSearchValue(res.data[0].display_name);
        const lat = parseFloat(res.data[0].lat);
        const lon = parseFloat(res.data[0].lon);
        setlatitude(lat);
        setlongitude(lon);
        setUserInfo((prev) => ({
          ...prev,
          locationcoordiantes: {
            ...prev.locationcoordiantes,
            coordinates: [lat, lon],
          },
        }));
        mapRef.current?.animateToRegion(
          {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 1,
            longitudeDelta: 1,
          },
          1000
        );
      }
    } catch (err) {
      console.log("locationError", err);
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDark
            ? Theme.dark.background
            : Theme.light.background,
        },
      ]}
    >
      <View
        style={[
          styles.innerView,
          {
            backgroundColor: isDark
              ? Theme.dark.background
              : Theme.light.background,
            borderColor: isDark ? Theme.dark.border : Theme.light.border,
          },
        ]}
      >
        <TextInput
          style={{
            paddingHorizontal: responsiveWidth(5),
            fontSize: responsiveFontSize(2),
            color: isDark ? Theme.dark.text : Theme.light.text,
            width: "90%",
            height: "100%",
          }}
          placeholderTextColor={
            isDark ? Theme.dark.text + "bf" : Theme.light.text + "bf"
          }
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Where Are You?"
        />
        <TouchableOpacity onPress={searchLocation}>
          <Icon
            name="search-outline"
            color={isDark ? Theme.dark.text : Theme.light.text}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    // padding: 10,
    width: responsiveWidth(100),
    height: responsiveHeight(40),
    overflow: "hidden",
  },
  innerView: {
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    borderRadius: 20,
    paddingHorizontal: 10,
    position: "absolute",
    top: responsiveHeight(3),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    borderWidth: 2,
    elevation: 4,
    overflow: "hidden",
    flexDirection: "row",
  },
});
export default LocationPicker;
