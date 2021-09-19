import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions/News";
import { Row, Col, Container, Card, Button, Spinner } from "react-bootstrap";

const NewsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const { news, loading, error } = useSelector((state) => ({
    news: state.News.news,
    error: state.News.error,
    loading: state.News.loading,
  }));

  return (
    <Container style={{ marginTop: "50px", marginBottom: "100px" }}>
      {loading ? (
        <div className="spinner-style">
          <Spinner animation="border" variant="light" />
        </div>
      ) : !loading && news ? (
        <Row xs={1} md={3}>
          {news.map((article, idx) => {
            return (
              <Col key={idx}>
                <Card
                  style={{
                    background: "#141414",
                    margin: "10px",
                  }}
                >
                  <Card.Img variant="top" src={article.image_url} />
                  <Card.Body>
                    <Card.Title
                      style={{
                        width: "content-width",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        width: "content-width",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.subtitle}
                    </Card.Text>
                    <Link to={`/news/${article._id}`}>
                      <Button
                        style={{
                          background: "#d1a019",
                          color: "black",
                          fontWeight: "bold",
                          border: "none",
                        }}
                      >
                        Vezi Articol
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div>{error}</div>
      )}
    </Container>
  );
};

export default NewsPage;
