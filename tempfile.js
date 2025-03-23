{
    data?.length > 0 &&
        data.length > 0 ? (
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
            <NoData msg="No new profiles available" msg2="Check back later!">
                <CustomButton
                    name="Reload"
                    outline={true}
                    onPress={() => {
                        setPage((prev) => prev + 1);
                    }}
                />
            </NoData>
        </View>
    )
}














              <View style={styles.container}>
                <ShimmerPlaceholder
                  shimmerColors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
                  autoRun={true} // Ensures shimmer effect runs
                  duration={1000} // Adjust speed of shimmer
                  LinearGradient={LinearGradient} // Correct prop name
                  style={styles.shimmerBox}
                />
              </View>













 <NoData
                    msg="No matches yet?"
                    msg2="Don’t rush! great things take time. Your person is coming! ❤"
                  >
                    <CustomButton
                      name="Explore Now"
                      outline={true}
                      onPress={() => {
                        navigation.jumpTo("Feed");
                      }}
                    />
                  </NoData>


{
    
      )
}