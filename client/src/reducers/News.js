import {
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAILURE,
  GET_NEWS_LOADING,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
  EDIT_NEWS_SUCCESS,
  EDIT_NEWS_FAILURE,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
} from "../actions/News";

const initialState = {
  news: [],
  loading: false,
  error: "",
};

const News = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, action.payload],
        error: "",
        loading: false,
      };
    case ADD_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_NEWS_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: "",
      };
    case GET_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EDIT_NEWS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        news: state.news.map((article) => {
          if (article._id === action.payload._id) {
            return action.payload;
          }
          return article;
        }),
      };

    case EDIT_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        news: state.news.filter((article) => {
          return article._id !== action.payload._id;
        }),
      };

    case DELETE_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default News;
