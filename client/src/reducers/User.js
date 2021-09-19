import {
  GET_USERS_SUCCESS,
  GET_USERS_LOADING,
  GET_USERS_FAILURE,
} from "../actions/User";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default User;
