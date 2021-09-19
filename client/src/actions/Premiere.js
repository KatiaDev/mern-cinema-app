import axios from "axios";
export const FETCH_PREMIERE_SUCCES = "FETCH_PREMIERE_SUCCES";
export const FETCH_PREMIERE_LOADING = "FETCH_PREMIERE_LOADING";
export const FETCH_PREMIERE_FAILURE = "FETCH_PREMIERE_FAILURE";

export const fetchPremiereMovies = () => async (dispatch) => {
  dispatch({
    type: FETCH_PREMIERE_LOADING,
  });
   axios
    .get(`${process.env.REACT_APP_API_URL}/premieres`)
    .then((premiere) => {
      console.log('request',`${process.env.REACT_APP_API_URL}/premieres`);
      console.log('succesPremieres',premiere);
      dispatch({
        type: FETCH_PREMIERE_SUCCES,
        payload: premiere.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FETCH_PREMIERE_FAILURE,
        payload: "Error fetch premieres",
      });
    });
};

export const ADD_PREMIERE_SUCCESS = "ADD_PREMIERE_SUCCESS";
export const ADD_PREMIERE_FAILURE = "ADD_PREMIERE_FAILURE";

export const addPremiere = (data) => async (dispatch) => {
  axios
    .post(
      process.env.REACT_APP_API_URL+'/premieres',
      {
        movie: data.movie,
        cinema: data.cinema,
        hall: data.hall,
        premiere_start_date: data.premiere_start_date,
        premiere_end_date: data.premiere_end_date,
        interval_hours: data.interval_hours,
        price: data.price,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((premiere) => {
      dispatch({
        type: ADD_PREMIERE_SUCCESS,
        payload: premiere.data,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: ADD_PREMIERE_FAILURE,
        payload: "Error.Could not add premiere.",
      });
    });
};

export const EDIT_PREMIERE_SUCCESS = "EDIT_PREMIERE_SUCCESS";
export const EDIT_PREMIERE_FAILURE = "EDIT_PREMIERE_FAILURE";

export const editPremiere = (premiere_id, data) => async (dispatch) => {
  axios
    .put(
      process.env.REACT_APP_API_URL+`/premieres/${premiere_id}`,
      {
        movie: data.movie,
        cinema: data.cinema,
        hall: data.hall,
        premiere_start_date: data.premiere_start_date,
        premiere_end_date: data.premiere_end_date,
        interval_hours: data.interval_hours,
        price: data.price,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((updatedPremiere) => {
      dispatch({
        type: EDIT_PREMIERE_SUCCESS,
        payload: updatedPremiere,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatchEvent({
        type: EDIT_PREMIERE_FAILURE,
        payload: "Error.Could not edit premiere.",
      });
    });
};

export const DELETE_PREMIERE_SUCCESS = "DELETE_PREMIERE_SUCCESS";
export const DELETE_PREMIERE_FAILURE = "DELETE_PREMIERE_FAILURE";

export const deletePremiere = (premiere_id) => async (dispatch) => {
  axios
    .delete(process.env.REACT_APP_API_URL+`/premieres/${premiere_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((removedPremiere) => {
   
      dispatch({
        type: DELETE_PREMIERE_SUCCESS,
        payload: "Premiere was successfully deleted.",
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: DELETE_PREMIERE_FAILURE,
        payload: "Error.Could not delete premiere.",
      });
    });
};
