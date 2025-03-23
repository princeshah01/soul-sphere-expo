import { StyleSheet, View } from "react-native";
import React from "react";
import UserCardSimmer from "./Components/UserCardSimmer";
import SearchLoading from "./Components/SearchLoading";
const ConnectionsLoading = ({ includeSearch }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 30, marginTop: 15 }}>
      {includeSearch && <SearchLoading />}
      <View style={{ gap: includeSearch ? 10 : 15 }}>
        <UserCardSimmer />
        <UserCardSimmer />
        <UserCardSimmer />
      </View>
    </View>
  );
};

export default ConnectionsLoading;

const styles = StyleSheet.create({});
