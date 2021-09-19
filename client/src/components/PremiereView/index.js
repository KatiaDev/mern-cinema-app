import React, { useState } from "react";
import "./index.css";
import "../../../node_modules/react-modal-video/css/modal-video.min.css";
import ReservationForm from "../ReservationForm";
import { Modal } from "react-bootstrap";

const PremiereDescription = ({ premiere }) => {
  const [show, setShow] = useState(false);

  return Object.keys(premiere).length > 0 ? (
    <div className="movieDetails">
      <div
        className="movieDetails__backdrop"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          objectFit: "contain",
          backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.8071603641456583) 100%), url(${premiere.movie.image_url})`,
        }}
      >
        <div className="movieDetails__main">
          <div className="movieDetails__info">
            <div>
              <img
                className="movieDetails__mainPoster"
                src={premiere.movie.image_url}
                alt={"Wrath of Man (2021)"}
              />
            </div>
            <div className="movieDetails__mainInfo">
              <h1 className="movieDetails__title">{premiere.movie.title}</h1>

              <p
                className="movieDetails__director"
                key={1 * Math.floor(Math.random() * 100)}
              >
                {premiere.movie.director}
              </p>

              <p className="movieDetails__runtime">{premiere.movie.duration}</p>

              <div className="movieDetails__genres">
                <p className="movieDetails__genre">
                  {premiere.movie.genre.join(", ")}
                </p>
              </div>
              <div className="movieDetails__buttonDiv">
                <div className="rating">
                  {}
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                <button
                  className="trailer__button movieDetails__button"
                  onClick={() => setShow(true)}
                >
                  Play Trailer
                </button>
                <Modal
                  size="lg"
                  show={show}
                  onHide={() => setShow(false)}
                  dialogClassName="modal-90w  "
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton className="video-trailer-header">
                    <Modal.Title id="example-custom-modal-styling-title">
                      {premiere.movie.title} - Trailer
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="video-trailer-body">
                    <iframe
                      width="100%"
                      title="movie-trailer"
                      src={premiere.movie.video_url}
                      height="450"
                      allow="autoplay;  encrypted-media; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </Modal.Body>
                </Modal>
              </div>
              <div>
                <p className="movieDetails__overview">
                  {premiere.movie.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ReservationForm premiere={premiere} />
      </div>
    </div>
  ) : null;
};

export default PremiereDescription;
