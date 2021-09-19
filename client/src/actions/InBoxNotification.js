import axios from "axios";
export const sendMessage = async (email, content, title) => {
  return await axios
    .post(process.env.REACT_APP_API_URL + "/notifications/guest", {
      email,
      content,
      title,
      connection_type: 1,
      notification_type: "Support",
    })
    .then((inBoxMessage) => {
      console.log(inBoxMessage);
      return inBoxMessage.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
