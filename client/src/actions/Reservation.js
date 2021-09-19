import axios from "axios";
import generateTicket from "./Ticket";
export const FETCH_RESERVATIONS_SUCCES = "FETCH_RESERVATIONS_SUCCES";
export const FETCH_RESERVATIONS_LOADING = "FETCH_RESERVATIONS_LOADING";
export const FETCH_RESERVATIONS_FAILURE = "FETCH_RESERVATIONS_FAILURE";
export const ADD_RESERVATIONS_SUCCES = "ADD_RESERVATIONS_SUCCES";
export const ADD_RESERVATIONS_LOADING = "ADD_RESERVATIONS_LOADING";
export const ADD_RESERVATIONS_FAILURE = "ADD_RESERVATIONS_FAILURE";

const fetchReservationsPremiere =
  (premiere_id, cinema_id, hall_id, params) => async (dispatch) => {
    dispatch({
      type: FETCH_RESERVATIONS_LOADING,
    });

    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/reservations/${premiere_id}/${cinema_id}/${hall_id}${params}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((reservation) => {
        dispatch({
          type: FETCH_RESERVATIONS_SUCCES,
          payload: reservation.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_RESERVATIONS_FAILURE,
          payload: "Error fetch reservation",
        });
      });
  };

export const addReservation =
  (
    seats,
    premiere,
    reserv_date,
    reserv_hour,
    total_price,
    status,
    methodPayment
  ) =>
  async (dispatch) => {
    dispatch({
      type: ADD_RESERVATIONS_LOADING,
    });

    axios
      .post(
        process.env.REACT_APP_API_URL + "/reservations/",
        {
          seats,
          premiere,
          reserv_date,
          reserv_hour,
          total_price,
          status: status,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((reservation) => {
        if (reservation.data.status === "Complete") {
          dispatch(generateTicket(reservation.data._id, methodPayment));
        }

        dispatch({
          type: ADD_RESERVATIONS_SUCCES,
          payload: reservation.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export default fetchReservationsPremiere;

export const GET_ALL_RESERVATIONS_LOADING = "GET_ALL_RESERVATIONS_LOADING";
export const GET_ALL_RESERVATIONS_SUCCESS = "GET_ALL_RESERVATIONS_SUCCESS";
export const GET_ALL_RESERVATIONS_ERROR = "GET_ALL_RESERVATIONS_ERROR";

export const getAllReservations =
  ({ limit, skip }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_RESERVATIONS_LOADING });

    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/reservations?limit=${limit}&skip=${skip}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((reservations) => {
        dispatch({
          type: GET_ALL_RESERVATIONS_SUCCESS,
          payload: reservations.data,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_ALL_RESERVATIONS_ERROR,
          payload: "Error.Could not get reservations.",
        });
      });
  };
