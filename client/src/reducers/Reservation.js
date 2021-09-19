import {
  FETCH_RESERVATIONS_SUCCES,
  FETCH_RESERVATIONS_FAILURE,
  GET_ALL_RESERVATIONS_LOADING,
  GET_ALL_RESERVATIONS_SUCCESS,
  GET_ALL_RESERVATIONS_ERROR,
} from "../actions/Reservation";

const initialState = {
  reservations: [],
  loading: false,
  error: "",
  pageCount: 0,
};

const Reservation = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS_SUCCES:
      return {
        ...state,
        reservations: action.payload,
      };
    case FETCH_RESERVATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case GET_ALL_RESERVATIONS_LOADING: {
      return {
        ...state,
        loading: true,
        error: "",
        pageCount: 0,
      };
    }

    case GET_ALL_RESERVATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        reservations: action.payload.data,
        pageCount: action.payload.paging.pages,
        error: "",
      };
    }

    case GET_ALL_RESERVATIONS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default Reservation;
