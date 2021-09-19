import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
import { useHistory, useLocation } from "react-router-dom";

const schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must have minimum length of 3.")
    .max(50)
    .required("Title field can't be empty."),

  genre: Yup.string()
    .min(1, "Please add at least one genre.")
    .required("Genre field can't be empty."),
  original_title: Yup.string(),

  director: Yup.string()
    .min(3, "Director name can't be less than 3 chars.")
    .required("Director field can't be empty."),

  release_date: Yup.date().required("Release date field can't be empty."),

  rating: Yup.number()
    .min(0, "Rating can't be less than 0.")
    .max(10, "Rating can't be more than 10.")
    .required("Rating field can't be empty."),

  description: Yup.string()
    .min(50, "Description must have mininum length of 50.")
    .required("Description field can't be empty."),

  actors: Yup.string().min(1).required("Actors field can't be empty."),
  age_restrict: Yup.string()
    .oneOf(["AG", "AP-12", "IM-18", "N-15"])
    .required("Age Restriction field is required."),

  duration: Yup.string().required("Duration field is required."),

  image_url: Yup.string()
    .url("Provided value must be a valid URL.")
    .required("Image url field is required."),
  video_url: Yup.string()
    .url("Provided value must be a valid URL.")
    .required("Video url field is required."),
});

const initialData = {
  title: "",
  original_title: "",
  genre: [],
  director: "",
  release_date: "",
  rating: 0,
  description: "",
  actors: [],
  age_restrict: "Age Restrict",
  duration: "",
  image_url: "",
  video_url: "",
};

const MovieForm = ({ initialMovie = initialData, onSubmitCallback }) => {
  const [data, setData] = useState(initialMovie);
  const [show, setShow] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorsState, setErrorsState] = useState({
    title: "",
    original_title: "",
    genre: "",
    director: "",
    release_date: "",
    rating: "",
    description: "",
    actors: "",
    age_restrict: "",
    duration: "",
    image_url: "",
    video_url: "",
  });

  const history = useHistory();
  const location = useLocation();

  const handleModalClose = () => {
    setData(initialMovie);
    setShow(false);
  };
  const handleModalShow = () => setShow(true);

  const goToMovie = () => {
    setData(initialMovie);
    history.push("/admin/movies");
  };

  //console.log("data: ", data);

  function handleFieldValidation(e) {
    Yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrorsState({
          ...errorsState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorsState({
          ...errorsState,
          [e.target.name]: err.errors[0],
        });
      });
  }

  useEffect(() => {
    async function helper() {
      if (location.pathname.includes("movie-edit")) {
        return setIsButtonDisabled(false);
      }
      const valid = await schema.isValid(data);
      setIsButtonDisabled(!valid);
    }
    helper();
  }, [data, location]);

  const handleInputChange = (e) => {
    handleFieldValidation(e);

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmitCallback(data);
  };

  const showWidget = (e) => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olymp-cinema",
        uploadPreset: "olymp_cinema",
        folder: "movies",
        chunk_size: 6000000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(
            "File uploaded successfully! Here is the info: ",
            result.info
          );
          if (e.target.id === "image_upload") {
            setData({ ...data, image_url: result.info.secure_url });
          } else if (e.target.id === "video_upload") {
            setData({ ...data, video_url: result.info.secure_url });
          }
        }
      }
    );

    widget.open();
  };

  return (
    <div className="section">
      <div className="section text-center">
        <h4 className="m-4 text-center">Movie Form</h4>
        <form onSubmit={handleFormSubmit} className="movie-form-style">
          <div className="row">
            <div className="col">
              <div className="form-group">
                {errorsState.title ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.title}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="title"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Title"
                  value={data.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  name="original_title"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Original Title"
                  value={data.original_title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-group">
                {errorsState.release_date ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.release_date}
                  </p>
                ) : null}
                <input
                  type="date"
                  name="release_date"
                  className="form-style"
                  //autoComplete="off"
                  placeholder="Release Date"
                  value={data?.release_date.split("T", 1) || data.release_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {errorsState.director ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.director}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="director"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Director"
                  value={data.director}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-group">
                {errorsState.rating ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.rating}
                  </p>
                ) : null}
                <input
                  type="number"
                  name="rating"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Rating"
                  value={data.rating}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {errorsState.duration ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.duration}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="duration"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Duration"
                  value={data.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-group">
                {errorsState.age_restrict ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.age_restrict}
                  </p>
                ) : null}
                <select
                  name="age_restrict"
                  className="form-style"
                  value={data.age_restrict}
                  onChange={handleInputChange}
                  style={{ WebkitAppearance: "none" }}
                >
                  <option value="Age Restrict">Age Restrict:</option>
                  <option value="AG">AG</option>
                  <option value="AP-12">AP-12</option>
                  <option value="N-15">N-15</option>
                  <option value="IM-18">IM-18</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {errorsState.genre ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.genre}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="genre"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Genre"
                  value={data.genre}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-group">
                {errorsState.actors ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.actors}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="actors"
                  className="form-style"
                  autoComplete="off"
                  placeholder="Actors"
                  value={data.actors}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {errorsState.description ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.description}
                  </p>
                ) : null}
                <textarea
                  name="description"
                  className="form-style"
                  placeholder="Description..."
                  value={data.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div className="form-group">
                {errorsState.image_url ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.image_url}
                  </p>
                ) : null}
                <div
                  id="image_upload"
                  onDoubleClick={showWidget}
                  className="form-style"
                >
                  Upload Image (double click)
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                {errorsState.video_url ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errorsState.video_url}
                  </p>
                ) : null}
                <div
                  id="video_upload"
                  onDoubleClick={showWidget}
                  className="form-style"
                >
                  Upload Video (double click)
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <div>
                {data.image_url && (
                  <img
                    src={data.image_url}
                    alt="movie_image"
                    style={{
                      width: 200,
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="col">
              <div>
                {data.video_url && (
                  <iframe
                    title="movie_video"
                    src={data.video_url}
                    allow="fullscreen; encrypted-media; picture-in-picture"
                    frameBorder="0"
                    style={{
                      height: 250,
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              {" "}
              <button
                className="btn btn-add mt-3"
                disabled={isButtonDisabled}
                onClick={handleModalShow}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        show={show}
        onHide={handleModalClose}
        className="modal-client_type"
        aria-labelledby="contained-modal-title-vcenter"
        data-backdrop="static"
        centered
      >
        <Modal.Header className="header-title" closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ color: "black", fontWeight: "bold", fontSize: "larger" }}
        >
          <i className="fa fa-check-circle" style={{ width: "500px" }}></i>
          {location.pathname.includes("/movie-edit") ? (
            <div className="txt"> Movie was edited successfully!</div>
          ) : (
            <div className="txt"> Movie was added successfully!</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={goToMovie}>
            Goto Movie
          </Button>{" "}
          <Button
            variant="secondary"
            className="w-25"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieForm;
