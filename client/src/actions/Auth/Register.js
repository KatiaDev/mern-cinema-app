import axios from "axios";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const requestRegister =
  ({ firstname, lastname,username, age, email, password, mobile }) =>
  async (dispatch) => {
   
    console.log(firstname, lastname,username, age, email, password, mobile );
    dispatch({
      type: REGISTER_REQUEST,
    });
     await axios
      .post(process.env.REACT_APP_API_URL+'/auth/register', {
        firstname,
        lastname,
        username,
        age,
        email,
        password,
        mobile,
      })
      .then((newUser) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: newUser.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.request.response.split("%")[1],
        });
      });
  };

export default requestRegister;
