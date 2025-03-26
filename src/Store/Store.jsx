import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Authreducer from "./Slice/Auth";
import Requestreducer from "./Slice/requests";
import Profilereducer from "./Slice/ProfileSetup";
import Connectionreducer from "./Slice/ConnectionSlice";
import Chatreducer from "./Slice/ChatSlice";
const AppStore = configureStore({
  reducer: {
    Auth: Authreducer,
    Requests: Requestreducer,
    Profile: Profilereducer,
    Connection: Connectionreducer,
    Chat: Chatreducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["Chat/setClient", "Chat/addPrivateChannelList"],
        ignoredPaths: ["Chat.chatClient", "Chat.privateChannelList"],
      },
    }),
});

export default AppStore;
