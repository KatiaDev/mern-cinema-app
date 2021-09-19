import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/Auth/LogIn";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/Auth/Register";

import {
  //CHECK_REGISTER_REQUEST,
  CHECK_REGISTER_SUCCESS,
  //CHECK_REGISTER_FAILURE,
} from "../actions/Auth/CheckRegister";

const initialStateLogin = {
  isFetching: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isAdmin: localStorage.getItem("isAdmin") ? true : false,
  isRegister: false,
  errorMessageLogin: "",
  errorMessageRegister: "",
};

const Auth = (state = initialStateLogin, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case LOGIN_SUCCESS: {
      return  {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        isAdmin: action.payload?.role === 0 ? false : true,
      };
    }

    case CHECK_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: action.payload.isAuthenticated,
        isAdmin: action.payload.isAdmin,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessageLogin: action.payload,
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        responseMessage: action.payload,
        isFetching: false,
        isRegister: true,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isRegister: false,
        errorMessageRegister: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default Auth;
