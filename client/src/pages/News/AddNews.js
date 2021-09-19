import React from "react";
import { useDispatch } from "react-redux";
import { addNews } from "../../actions/News";
import NewsForm from "../../components/NewsForm";

const AddNews = () => {
  const dispatch = useDispatch();

  const onSubmitCallback = (article) => {
    dispatch(addNews(article));
  };
  return <NewsForm onSubmitCallback={onSubmitCallback} />;
};

export default AddNews;
