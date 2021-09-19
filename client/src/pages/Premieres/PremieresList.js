import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPremiereMovies } from "../../actions/Premiere";
import { useSelector, useDispatch } from "react-redux";
import { Card, Spinner } from "react-bootstrap";

const PremieresList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPremiereMovies());
  }, [dispatch]);

  const { premieres, loading, error } = useSelector((state) => ({
    premieres: state.Premiere.premieres,
    loading: state.Premiere.loading,
    error: state.Premiere.error,
  }));

  return (
    <>
      {loading ? (
        <div className="spinner-style">
          <Spinner animation="border" variant="light" />
        </div>
      ) : !loading && premieres ? (
        <div className="row">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Premieres</h2>
          </div>
          {premieres.map((premiere) => {
            return (
              <Link
                to={`/admin/premieres/${premiere._id}`}
                key={premiere._id}
                style={{ width: 250, marginLeft: 20, textDecoration: "none" }}
              >
                {premiere?.movie ? (
                  <Card className="mb-3">
                    <Card.Img
                      variant="top"
                      src={premiere?.movie.image_url}
                      className="card-img-top movie_card_img"
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          width: "content-width",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {premiere?.movie.title}
                      </Card.Title>
                      <Card.Footer>
                        <span className="movie_info">
                          {
                            premiere?.movie.release_date
                              .split("T")[0]
                              .split("-")[0]
                          }
                        </span>
                        <span className="movie_info float-right">
                          <i className="fas fa-star"></i>{" "}
                          {premiere?.movie.rating}
                        </span>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default PremieresList;
