import axios from "axios";
export const FETCH_SEATS_SUCCES = "FETCH_SEATS_SUCCES";
export const FETCH_SEATS_LOADING = "FETCH_SEATS_LOADING";
export const FETCH_SEATS_FAILURE = "FETCH_SEATS_FAILURE";

const fetchSeatsPremiere = () => async (dispatch) => {
  dispatch({
    type: FETCH_SEATS_LOADING,
  });

  axios
    .get(process.env.REACT_APP_API_URL+'/seats', {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((seat) => {
      dispatch({
        type: FETCH_SEATS_SUCCES,
        payload: seat.data.map((el) => {
          return { ...el, seat_status: "free" };
        }),
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_SEATS_FAILURE,
        payload: "Error fetch seats",
      });
    });
};

export default fetchSeatsPremiere;
