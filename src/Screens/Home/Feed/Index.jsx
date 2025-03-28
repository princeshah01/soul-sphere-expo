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
import { useSelector } from "react-redux";
import axios from "axios";
import env from "../../../Constant/env";
import { ActivityIndicator } from "react-native-paper";
import { showToast } from "../../../Components/showToast";
import CustomButton from "../../../Components/CustomBotton";
import NoData from "../../../Components/NoData";
import SvgComponent from "../../../Components/Slider";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
const Feed = ({ filterOpen, bottomSheetRef, isOpen }) => {
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
        console.log(response.data?.data?.length + "data from api");
        if (response.data?.data?.length > 0) {
          setData(response?.data?.data);
        } else {
          setData([]);
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
  }, [page]);

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
        position: "relative",
        backgroundColor: isDark
          ? Theme.dark.background
          : Theme.light.background,
      }}
    >
      <View style={{ zIndex: 10 }}>
        <View
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
          <TouchableOpacity
            onPress={() => {
              console.log(isOpen);
              if (isOpen) {
                bottomSheetRef.current.close();
                return;
              }
              filterOpen(true);
              bottomSheetRef?.current.snapToIndex(0);
            }}
          >
            <SvgComponent
              size={28}
              color={isDark ? Theme.dark.text : Theme.light.text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: height * 0.82,
            width,
            padding: 10,
            backgroundColor: "transparent",
            zIndex: 100,
          }}
        >
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: responsiveHeight(-9),
                marginLeft: -10,
                // backgroundColor: "red",
              }}
            >
              {data?.length > 0 && data.length > 0 ? (
                <Swiper
                  key={data.length}
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
                  onSwipedAll={() => {
                    console.log("getting new data");
                    setPage((prev) => prev + 1);
                  }}
                  onSwipedLeft={(idx) => {
                    handleSwipe("ignored", data[idx]._id);
                    console.log(
                      "leftSwiped user feed/index.js " + data[idx]._id
                    );
                  }}
                  onSwipedRight={(idx) => {
                    handleSwipe("interested", data[idx]._id);
                    console.log(
                      "RightSwiped user feed/index.js",
                      data[idx]._id
                    );
                  }}
                  overlayLabels={{
                    left: {
                      title: (
                        <View style={[styles.overlayLabel]}>
                          <LottieView
                            source={require("../../../../assets/sadEmoji.json")}
                            autoPlay
                            loop={true}
                            style={styles.lottie}
                          />
                        </View>
                      ),
                      style: {
                        wrapper: {
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          position: "absolute",
                          // top: 150,
                          left: 80,
                        },
                      },
                    },

                    right: {
                      title: (
                        <View style={[styles.overlayLabel]}>
                          <LottieView
                            source={require("../../../../assets/happyEmoji.json")}
                            autoPlay
                            loop={true}
                            style={[styles.lottie, { width: 150, height: 150 }]}
                          />
                        </View>
                      ),
                      style: {
                        wrapper: {
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "flex-start",
                          position: "absolute",
                          // top: 150,
                          right: 80,
                        },
                      },
                    },
                  }}
                  animateOverlayLabelsOpacity={true}
                />
              ) : (
                <View style={styles.noData}>
                  <NoData
                    msg="No new profiles available"
                    msg2="Check back later!"
                  >
                    <CustomButton
                      name="Reload"
                      outline={true}
                      onPress={() => {
                        setPage((prev) => prev + 1);
                      }}
                    />
                  </NoData>
                </View>
              )}
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
  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  overlayLeft: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlayRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
