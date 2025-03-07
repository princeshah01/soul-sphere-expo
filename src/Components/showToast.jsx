import Toast from "react-native-toast-message";
export const showToast = (type, message) => {
  Toast.show({
    type: type,
    text1: type[0].toUpperCase() + type.slice(1),
    text2: message,
    visibilityTime: 1800,
  });
};
