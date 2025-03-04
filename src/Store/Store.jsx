import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Slice/Auth";
const AppStore = configureStore({
  reducer: {
    Auth: Authreducer,
  },
});

export default AppStore;
