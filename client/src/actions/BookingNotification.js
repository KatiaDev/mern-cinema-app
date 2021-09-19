import axios from "axios";
export const BOOKING_NOTIFICATION_SUCCES = "BOOKING_NOTIFICATION_SUCCES";
export const BOOKING_NOTIFICATION_LOADING = "BOOKING_NOTIFICATION_LOADING";
export const BOOKING_NOTIFICATION_FAILURE = "BOOKING_NOTIFICATION_FAILURE";

const generateBookingNotification = (reservation, pay_type) => async (dispatch) => {
  dispatch({
    type: BOOKING_NOTIFICATION_LOADING,
  });

  axios
    .post(
      process.env.REACT_APP_API_URL+'/tickets',
      {
        reservation,
        pay_type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((booking) => {
      dispatch({
        type: BOOKING_NOTIFICATION_SUCCES,
        payload: booking.data,
      });
      console.log("ticket", booking);
    })
    .catch((err) => {
      dispatch({
        type: BOOKING_NOTIFICATION_FAILURE,
        payload: "Error send booking notification",
      });
    });
};

export default generateBookingNotification;
