import {
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  GET_MOVIES_LOADING,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_FAILURE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
} from "../actions/Movie";

const initialState = {
  movies: [],
  error: "",
  loading: false,
  pageCount: 0,
};

const Movie = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        error: "",
        loading: false,
      };

    case ADD_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_MOVIES_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        pageCount: 0,
      };

    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.data,
        pageCount: action.payload.paging.pages,
        loading: false,
        error: "",
      };

    case GET_MOVIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EDIT_MOVIE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        movies: state.movies.map((movie) => {
          if (movie._id === action.payload._id) {
            return action.payload;
          }
          return movie;
        }),
      };
    case EDIT_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DELETE_MOVIE_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        movies: state.movies.filter((movie) => {
          return movie._id !== action.payload._id;
        }),
      };

    case DELETE_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Movie;
