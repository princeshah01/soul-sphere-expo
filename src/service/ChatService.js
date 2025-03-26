import { StreamChat } from "stream-chat";

let client = null;

const connectUser = async (user, chatToken) => {
  try {
    if (!user || !chatToken) {
      throw new Error("no user found");
    }

    if (!client) {
      client = StreamChat.getInstance("syb8z9vfk324");
    }

    if (client.userID !== user._id) {
      console.log("connecting...");
      await client.connectUser(
        {
          id: user._id,
          name: user.fullName,
          email: user.email,
        },
        chatToken
      );
      console.log("connected");
    } else {
      console.log("user already connected");
    }

    return client;
  } catch (error) {
    console.error("Error connecting user:", error);
    return null;
  }
};

export const getChannelList = async (user) => {
  try {
    if (!client.userID) {
      throw new Error("something went wrong");
    }
    const filter = { type: "messaging", members: { $in: [user._id] } };
    const sort = { last_message_at: -1 };
    const options = { watch: true, state: true, presence: true, members: true };
    const channels = await client.queryChannels(filter, sort, options);
    console.log(channels);
    return channels;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default connectUser;
export const getChatClient = () => client;
