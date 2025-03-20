import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slice/Auth";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";
const Logout = () => {
  const user = useSelector((store) => store.Auth.user);
  // console.log(user);
  const dispatch = useDispatch();
  const HandleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout());

      // console.log("App data cleared");
    } catch (e) {
      console.error("Failed to clear app data", e);
    }
  };
  return (
    <TouchableOpacity
      style={{
        paddingTop: 10,
      }}
      onPress={() => {
        HandleLogout();
      }}
    >
      <Icon name="log-out-outline" size={responsiveFontSize(4)} color="red" />
    </TouchableOpacity>
  );
};
export default Logout;
