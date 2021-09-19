import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Card, Row, Col, Button } from "react-bootstrap";

import "./index.css";

const CardCustom = ({ movie, premiere, handleShow }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {premiere?.movie || movie ? (
        <Card bg="dark" border="light" className="p-3">
          <Card.Header>{premiere?.movie.title || movie.title}</Card.Header>
          <Row>
            <Col lg={4}>
              <Card.Img
                style={{ width: "100%" }}
                src={premiere?.movie.image_url || movie.image_url}
              />
            </Col>
            <Col lg={8}>
              <Card.Body>
                {movie ? (
                  <Card.Title>
                    Original title: {movie.original_title}
                  </Card.Title>
                ) : (
                  <Card.Text>
                    <strong>Start Date:</strong>
                    {premiere.premiere_start_date.split("T", 1).toString()}
                    <span style={{ padding: "10px" }}> </span>
                    <strong>End Date:</strong>
                    {premiere.premiere_end_date.split("T", 1).toString()}
                  </Card.Text>
                )}
                <Card.Text as="div" className="card_cat mt-3 mb-0">
                  <p className="PG">
                    {premiere?.movie.age_restrict || movie.age_restrict}
                  </p>
                  <p className="genre">
                    {premiere?.movie.genre.join(", ") ||
                      (movie.genre && movie.genre.join(", "))}
                  </p>
                </Card.Text>
                <Card.Text as="div">
                  {movie ? (
                    <p className="year">
                      Release date:{" "}
                      {movie.release_date &&
                        movie.release_date.split("T", 1).toString()}
                    </p>
                  ) : (
                    <p className="info">Price: {premiere.price} MDL</p>
                  )}
                  <p className="time">
                    Duration: {premiere?.movie.duration || movie.duration}
                  </p>
                </Card.Text>
                <Card.Text>
                  {movie ? (
                    <>
                      <strong>Sinopsys:</strong>
                      {movie.description}
                    </>
                  ) : (
                    <>
                      <strong>Sessions:</strong>
                      {premiere.interval_hours.map((hour, idx) => (
                        <span style={{ padding: "10px" }} key={idx}>
                          {hour}
                        </span>
                      ))}
                    </>
                  )}
                </Card.Text>
                <Card.Text as="div">
                  {movie ? (
                    <>
                      <strong>Director:</strong> {movie.director}
                      <br></br>
                      <strong>Stars:</strong>{" "}
                      {movie.actors && movie.actors.join(", ")}
                    </>
                  ) : (
                    <p>
                      <strong>Cinemas:</strong>
                      {premiere?.cinema.map((cinema, idx) => (
                        <span style={{ padding: "10px" }} key={idx}>
                          {cinema.name}
                        </span>
                      ))}
                      <br></br>
                      <strong> Halls:</strong>
                      {premiere?.hall.map((hall, idx) => (
                        <span style={{ padding: "10px" }} key={idx}>
                          {hall.name}
                        </span>
                      ))}
                    </p>
                  )}
                </Card.Text>
                <Button className="crd-button" onClick={() => setShow(true)}>
                  <i className="fas fa-play "></i> SEE TRAILER
                </Button>
                <Modal
                  size="lg"
                  show={show}
                  onHide={() => setShow(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Trailer
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <iframe
                      width="100%"
                      title="movie-trailer"
                      src={premiere?.movie.video_url || movie.video_url}
                      height="450"
                      allow="autoplay;  encrypted-media; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </Modal.Body>
                </Modal>
                <Button className="crd-button">
                  <i className="fas fa-star "></i>
                  <span> RATING {premiere?.movie.rating || movie.rating}</span>
                </Button>
              </Card.Body>
            </Col>
            <Card.Footer as="div" className="text-center">
              {movie ? (
                <Link to={`/admin/movies/movie-edit/${movie._id}`}>
                  <Button className="crd-footer">Edit</Button>
                </Link>
              ) : (
                <Link to={`/admin/premieres/premiere-edit/${premiere._id}`}>
                  <Button className="crd-footer">Edit</Button>
                </Link>
              )}
              <Button
                variant="danger"
                onClick={handleShow}
                className="crd-footer"
              >
                Delete
              </Button>
            </Card.Footer>
          </Row>
        </Card>
      ) : null}
    </>
  );
};

export default CardCustom;
