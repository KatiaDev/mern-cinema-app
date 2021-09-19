import React from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editNews } from "../../actions/News";
import NewsForm from "../../components/NewsForm";

const EditNews = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.News.news);
  const currentArticle = newsList.find(
    (article) => article._id === params.news_id
  );

  const onSubmitCallback = (article) => {
    const article_id = currentArticle._id;
    dispatch(editNews(article_id, article)).then(() => {
      history.push(`/admin/news/${article_id}`);
      // history.goBack();
    });
  };

  return (
    <NewsForm
      initialArticle={currentArticle}
      onSubmitCallback={onSubmitCallback}
    />
  );
};

export default EditNews;
