import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { Col, Container } from "react-bootstrap";
import { deleteNews } from "../../actions/News";
import DeleteModal from "../../components/DeleteModal";

const NewsArticle = () => {
  const { news } = useSelector((state) => ({
    news: state.News.news,
  }));

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newsArticle = news.find((article) => article._id === params.news_id);

  const handleClickDeleteBtn = () => {
    console.log("articleId", newsArticle._id);
    dispatch(deleteNews(newsArticle._id)).then(() => {
      history.push("/admin/news");
    });
  };

  return (
    <>
      <Container style={{ marginTop: "50px", marginBottom: "100px" }}>
        <div
          className="row"
          style={{
            background: "#141414",
            border: "2px solid white",
            padding: "15px",
            borderRadius: "20px",
          }}
        >
          <h2>{newsArticle.title}</h2>{" "}
          <Col>
            <img
              src={newsArticle.image_url}
              style={{ width: "100%", margin: 0 }}
              alt="news-article"
            />
          </Col>
          <Col>
            <h3 style={{ marginTop: "10px" }}>{newsArticle.subtitle}</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <Link to={`/admin/news/news-edit/${newsArticle._id}`}>
                <button
                  className="btn btn-primary"
                  style={{ width: "150px", marginRight: "10px" }}
                >
                  Edit
                </button>
              </Link>
              <button
                className="btn btn-danger"
                style={{ width: "150px" }}
                onClick={handleShow}
              >
                Delete
              </button>
            </div>
          </Col>
          <p style={{ marginTop: "30px" }}>{newsArticle.content}</p>
        </div>
      </Container>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleClickDeleteBtn={handleClickDeleteBtn}
        text="Article"
      />
    </>
  );
};

export default NewsArticle;
