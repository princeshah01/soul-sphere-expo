import React, { useCallback, useState } from "react";
import { ChannelList } from "stream-chat-expo";
import { useSelector } from "react-redux";
import env from "../../../Constant/env";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { View, Text } from "react-native";
import { Theme } from "../../../Constant/Theme.js";

const Chat = () => {
  const { token } = useSelector((store) => store.Auth);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getData = async () => {
        try {
          const response = await axios.get(
            env.API_BASE_URL + "/user/channels",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200 && isActive) {
            setChannel(response?.data?.channels || []);
          }
        } catch (error) {
          console.log(error.response?.data || "Error fetching channels");
        } finally {
          if (isActive) setLoading(false);
        }
      };

      getData();

      return () => {
        isActive = false;
      };
    }, [token])
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (channel.length > 0) {
    console.log(
      "Channel ID:",
      channel[0]?.id,
      "Channel Name:",
      channel[0]?.name,
      "Members:",
      channel[0]?.members
    );
  }

  const filters =
    channel.length > 0 ? { id: { $in: channel.map((c) => c.id) } } : {};

  return (
    <View style={{ flex: 1, padding: 20, borderRadius: 30 }}>
      <ChannelList filters={filters} />
    </View>
  );
};

export default Chat;
