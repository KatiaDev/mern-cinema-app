import axios from "axios";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_LOADING = "GET_USERS_LOADING";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LOADING });

  axios
    .get(process.env.REACT_APP_API_URL + "/users", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((users) => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: users.data,
      });
    })
    .catch((error) => {
      console.error(error);

      dispatch({
        type: GET_USERS_FAILURE,
        payload: "Error.Could not get users.",
      });
    });
};

export default getUsers;
