const [modalVisible, setModalVisible] = useState(false);

const ConfirmLogout = ({ navigation, setModalVisible, modalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ paddingHorizontal: 20, gap: 20 }}>
            <Text style={styles.modalText}>
              Are you sure you want to log out? Your matches might miss you! ☹
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <CustomButton
                name="Cancel"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <CustomButton
                name="Logout"
                outline={true}
                onPress={() => {
                  navigation.replace("Login");
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

<ConfirmLogout
  modalVisible={modalVisible}
  setModalVisible={setModalVisible}
  navigation={navigation}
/>;
