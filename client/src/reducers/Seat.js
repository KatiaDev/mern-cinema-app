import { FETCH_SEATS_SUCCES, FETCH_SEATS_FAILURE } from "../actions/Seat";

const initialState = {
  seats: [],
  error: "",
};

const Seat = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEATS_SUCCES:
      return {
        ...state,
        seats: action.payload,
      };
    case FETCH_SEATS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Seat;
