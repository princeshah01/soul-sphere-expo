import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
const { width, height } = Dimensions.get("window");
import ProfileImage from "../../../Components/ProfileSetup/ProfileImage";
import Card from "./Card";
import Swiper from "react-native-deck-swiper";
import { Theme } from "../../../Constant/Theme";
import { useDarkMode } from "../../../provider/DarkModeProvider";
import Logo from "../../../Components/Logo";
import { useSelector } from "react-redux";
import axios from "axios";
import env from "../../../Constant/env";
import { ActivityIndicator } from "react-native-paper";
import { showToast } from "../../../Components/showToast";

const Feed = ({ navigation }) => {
  const { user, token } = useSelector((store) => store.Auth);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getFeedData = async () => {
    setIsLoading(true);
    try {
      console.log(page + "page ");
      let uri = `${env.API_BASE_URL}/feed/${page}`;
      console.log(uri);
      let response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        console.log(response.data.data.length + "data from api");
        if (response.data.data.length > 0) {
          setData((prev) => [...prev, ...response.data.data]);
          setPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error.message + "feed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);
  const handleS = (index) => {
    if (index >= data.length - 2) {
      getFeedData();
    }
  };

  const [greetMsg, setGreetMsg] = useState("");

  useEffect(() => {
    const hourDate = new Date().getHours();

    if (hourDate < 12) {
      setGreetMsg("Good morning🤶");
    } else if (hourDate >= 12 && hourDate < 16) {
      setGreetMsg("Good afternoon🤶");
    } else {
      setGreetMsg("Good evening🤶");
    }
  }, []);
  const handleSwipe = async (status, _id) => {
    try {
      let response = await axios.post(
        `${env.API_BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const { isDark } = useDarkMode();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
        zIndex: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Profile");
        }}
        style={{
          height: height * 0.08,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "transparent",
          gap: 10,
        }}
      >
        <ProfileImage profilePicture={user.profilePicture} size={50} />
        <View style={{ width: width * 0.6 }}>
          <Text
            style={{
              fontSize: 16,
              opacity: 0.8,
              color: isDark ? Theme.dark.text : Theme.light.text,
            }}
          >
            {greetMsg}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: isDark ? Theme.dark.text : Theme.light.text,
              textTransform: "capitalize",
            }}
          >
            {user.fullName}
          </Text>
        </View>
        {/* here instead of logo will be showing a filter icon to filter feed data */}
        <Logo size={40} />
      </TouchableOpacity>
      <View
        style={{
          height: height * 0.82,
          width,
          padding: 10,
          backgroundColor: "transparent",
          zIndex: 100,
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: -60,
            marginLeft: -10,
          }}
        >
          {/* {data?.length > 0 &&  */}
          {isLoading ? (
            <View style={styles.noData}>
              <ActivityIndicator />
            </View>
          ) : data.length > 0 ? (
            <Swiper
              key={page}
              cards={data}
              verticalSwipe={false}
              renderCard={(item) => <Card user={item} />}
              stackSize={2}
              backgroundColor="transparent"
              cardStyle={{
                width: width * 0.9,
                height: height * 0.8,
                justifyContent: "center",
                alignItems: "center",
              }}
              containerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              // onSwipedAll={() => {
              //   console.log("getting new data");
              //   setPage((prev) => prev + 1);
              // }}
              onSwiped={(index) => {
                handleS(index);
              }}
              onSwipedLeft={(idx) => {
                handleSwipe("ignored", data[idx]._id);
                console.log("leftSwiped user feed/index.js " + data[idx]._id);
              }}
              onSwipedRight={(idx) => {
                handleSwipe("interested", data[idx]._id);
                console.log("RightSwiped user feed/index.js", data[idx]._id);
              }}
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      backgroundColor: "#f07380EE",
                      borderColor: "#eb1329",
                      color: "#eb1329",
                      borderWidth: 2,
                      transform: [{ rotate: "-30deg" }],
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      position: "absolute",
                      top: 150,
                      right: 40,
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: "#a8eb718c",
                      borderColor: "#73e813",
                      color: "#73e813",
                      borderWidth: 2,
                      transform: [{ rotate: "30deg" }],
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      position: "absolute",
                      top: 150,
                      left: 40,
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity={true}
            />
          ) : (
            <View style={styles.noData}>
              <Text>No Data Left to Show Try Again later!!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  noData: {
    width: width,
    height: height * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
});
