import {
  FETCH_PREMIERE_SUCCES,
  FETCH_PREMIERE_LOADING,
  FETCH_PREMIERE_FAILURE,
  ADD_PREMIERE_SUCCESS,
  ADD_PREMIERE_FAILURE,
  EDIT_PREMIERE_SUCCESS,
  EDIT_PREMIERE_FAILURE,
  DELETE_PREMIERE_SUCCESS,
  DELETE_PREMIERE_FAILURE,
} from "../actions/Premiere";

const initialState = {
  premieres: [],
  error: "",
  loading: false,
};

const Premiere = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREMIERE_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_PREMIERE_SUCCES:
      return {
        ...state,
        premieres: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_PREMIERE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case ADD_PREMIERE_SUCCESS:
      return {
        ...state,
        premieres: [...state.premieres, action.payload],
        error: "",
        loading: false,
      };

    case ADD_PREMIERE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EDIT_PREMIERE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        premieres: state.premieres.map((premiere) => {
          if (premiere._id === action.payload._id) {
            return action.payload;
          }
          return premiere;
        }),
      };

    case EDIT_PREMIERE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DELETE_PREMIERE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        premieres: state.premieres.filter((premiere) => {
          return premiere._id !== action.payload._id;
        }),
      };

    case DELETE_PREMIERE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Premiere;
