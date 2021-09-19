import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../actions/Movie";
import CardCustom from "../../components/CardCustom";
import DeleteModal from "../../components/DeleteModal";
import axios from "axios";

const SingleMovie = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { movie_id } = params;
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`https://api-olymp-cinema.herokuapp.com/api/movies/${movie_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((movie) => {
        setMovie(movie.data);
      });
  }, [movie_id]);

  const handleClickDeleteBtn = () => {
    console.log("movieId", movie._id);
    dispatch(deleteMovie(movie._id)).then(() => {
      history.push("/admin/movies");
    });
  };

  //console.log("single-movie: ", movie.release_date);
  return (
    <>
      <div className="container">
        <CardCustom movie={movie} handleShow={handleShow} />
      </div>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleClickDeleteBtn={handleClickDeleteBtn}
        text="Movie"
      />
    </>
  );
};

export default SingleMovie;
