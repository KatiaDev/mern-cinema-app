import axios from "axios";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const requestLogin = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

   axios
    .post(process.env.REACT_APP_API_URL + "/auth/login", {
      email,
      password,
    })
    .then((user) => {
      console.log("user: ", user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.data,
      });

      localStorage.setItem("token", user.data.token);
      user.data.role === 1 && localStorage.setItem("isAdmin", user.data.role);
    })
    .catch((error) => {
      // console.log("eroare", error.request.response);
      console.log("eroare", error.request.response);

      dispatch({
        type: LOGIN_FAILURE,
        payload:  error.request.response.split("%")[1],
      });
    });
};

export default requestLogin;
