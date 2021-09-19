import axios from "axios";
export const ADD_MOVIE_SUCCESS = "ADD_MOVIE_SUCCESS";
export const ADD_MOVIE_FAILURE = "ADD_MOVIE_FAILURE";

export const addMovie = (data) => async (dispatch) => {
  await axios
    .post(
      process.env.REACT_APP_API_URL + "/movies",
      {
        title: data.title,
        original_title: data.original_title,
        genre: data.genre,
        director: data.director,
        release_date: data.release_date,
        rating: data.rating,
        description: data.description,
        actors: data.actors,
        age_restrict: data.age_restrict,
        duration: data.duration,
        image_url: data.image_url,
        video_url: data.video_url,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((movie) => {
      dispatch({
        type: ADD_MOVIE_SUCCESS,
        payload: movie.data,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: ADD_MOVIE_FAILURE,
        payload: "Error ocurred while adding new movie.",
      });
    });
};

export const GET_MOVIES_LOADING = "GET_MOVIES_LOADING";
export const GET_MOVIES_SUCCESS = "ET_MOVIES_SUCCESS";
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

export const getMovies =
  ({ limit, skip }) =>
  async (dispatch) => {
    dispatch({ type: GET_MOVIES_LOADING });

    axios
      .get(
        process.env.REACT_APP_API_URL + `/movies?limit=${limit}&skip=${skip}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((movies) => {
        dispatch({
          type: GET_MOVIES_SUCCESS,
          payload: movies.data,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_MOVIES_FAILURE,
          payload: "Error.Could not get movies.",
        });
      });
  };

export const EDIT_MOVIE_SUCCESS = "EDIT_MOVIE_SUCCESS";
export const EDIT_MOVIE_FAILURE = "EDIT_MOVIE_FAILURE";

export const editMovie = (movie_id, data) => async (dispatch) => {
  axios
    .put(
      process.env.REACT_APP_API_URL + `/movies/${movie_id}`,
      {
        title: data.title,
        original_title: data.original_title,
        genre: data.genre,
        director: data.director,
        release_date: data.release_date,
        rating: data.rating,
        description: data.description,
        actors: data.actors,
        age_restrict: data.age_restrict,
        duration: data.duration,
        image_url: data.image_url,
        video_url: data.video_url,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((updatedMovie) => {
      dispatch({
        type: EDIT_MOVIE_SUCCESS,
        payload: updatedMovie,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: EDIT_MOVIE_FAILURE,
        payload: "Error.Could not edit movie.",
      });
    });
};

export const DELETE_MOVIE_SUCCESS = "DELETE_MOVIE_SUCCESS";
export const DELETE_MOVIE_FAILURE = "DELETE_MOVIE_FAILURE";

export const deleteMovie = (movie_id) => async (dispatch) => {
  await axios
    .delete(process.env.REACT_APP_API_URL + `/movies/${movie_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((removedMovie) => {
      dispatch({
        type: DELETE_MOVIE_SUCCESS,
        payload: "The movie was successfully deleted.",
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: DELETE_MOVIE_FAILURE,
        payload: "Error.Could not delete movie.",
      });
    });
};
