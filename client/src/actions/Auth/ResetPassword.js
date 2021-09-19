import axios from "axios";

export const requestResetPassword = async (email) => {
  return await axios
    .post(process.env.REACT_APP_API_URL + "/auth/request/reset-password", {
      email,
    })
    .then((user) => {
      return user.data;
    })
    .catch((error) => {
      return JSON.parse(error.request.response);
    });
};

export const resetPassword = async (user_id, new_password) => {
  return await axios.patch(
    process.env.REACT_APP_API_URL + "/auth/reset-password/",
    {
      user_id,
      new_password,
    }
  );
};
