import axios from "axios";
export const ADD_NEWS_SUCCESS = "ADD_NEWS_SUCCESS";
export const ADD_NEWS_FAILURE = "ADD_NEWS_FAILURE";

export const addNews = (data) => async (dispatch) => {
  axios
    .post(
      process.env.REACT_APP_API_URL+'/news',
      {
        title: data.title,
        subtitle: data.subtitle,
        image_url: data.image_url,
        content: data.content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((newsArticle) => {
      dispatch({
        type: ADD_NEWS_SUCCESS,
        payload: newsArticle.data,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: ADD_NEWS_FAILURE,
        payload: "Error.could not add news.",
      });
    });
};

export const GET_NEWS_LOADING = "GET_NEWS_LOADING";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";

export const getNews = () => async (dispatch) => {
  dispatch({ type: GET_NEWS_LOADING });

  axios
    .get(process.env.REACT_APP_API_URL+'/news')
    .then((news) => {
      dispatch({
        type: GET_NEWS_SUCCESS,
        payload: news.data,
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: GET_NEWS_FAILURE,
        payload: "Error.Could not get news.",
      });
    });
};

export const EDIT_NEWS_SUCCESS = "EDIT_NEWS_SUCCESS";
export const EDIT_NEWS_FAILURE = "EDIT_NEWS_FAILURE";

export const editNews = (news_id, data) => async (dispatch) => {
  axios
    .put(
      process.env.REACT_APP_API_URL+`/news/${news_id}`,
      {
        title: data.title,
        subtitle: data.subtitle,
        image_url: data.image_url,
        content: data.content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((newsArticle) => {
      dispatch({
        type: EDIT_NEWS_SUCCESS,
        payload: newsArticle,
      });
    })
    .catch((error) => {
      dispatch({
        type: EDIT_NEWS_FAILURE,
        payload: "Error.Could not edit news article.",
      });
    });
};

export const DELETE_NEWS_SUCCESS = "DELETE_NEWS_SUCCESS";
export const DELETE_NEWS_FAILURE = "DELETE_NEWS_FAILURE";

export const deleteNews = (news_id) => async (dispatch) => {
  axios
    .delete(process.env.REACT_APP_API_URL+`/news/${news_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((newsArticle) => {
      dispatch({
        type: DELETE_NEWS_SUCCESS,
        payload: "News article was successfully deleted.",
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: DELETE_NEWS_FAILURE,
        payload: "Error.Could not delete news article.",
      });
    });
};
