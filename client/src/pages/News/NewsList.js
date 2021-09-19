import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSearch } from "../../contexts/SearchContext";
import { getNews } from "../../actions/News";
import { Row, Col, Container, Card, Button, Spinner } from "react-bootstrap";

const NewsList = () => {
  const dispatch = useDispatch();
  const { filteredData } = useSearch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const { news, loading, error } = useSelector((state) => ({
    news: state.News.news,
    error: state.News.error,
    loading: state.News.loading,
  }));

  return (
    <>
      <Container>
        {loading ? (
          <div className="spinner-style">
            <Spinner animation="border" variant="light" />
          </div>
        ) : !loading && news ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2>News</h2>

              <Link to="/admin/news/news-add">
                <Button
                  className="btn btn-secondary wrn-btn"
                  style={{
                    background: "#d1a019",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "15px",
                  }}
                >
                  Add Article{" "}
                </Button>
              </Link>
            </div>
            <Row xs={1} md={3}>
              {filteredData.map((article, idx) => {
                return (
                  <Col key={idx}>
                    <Card style={{ background: "#141414", margin: "10px" }}>
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
                        <Link to={`/admin/news/${article._id}`}>
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
          </>
        ) : (
          <div>{error}</div>
        )}
      </Container>
    </>
  );
};

export default NewsList;
