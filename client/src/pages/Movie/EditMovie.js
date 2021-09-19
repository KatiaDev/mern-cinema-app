import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { editMovie } from "../../actions/Movie";
import MovieForm from "../../components/MovieForm";

const EditMovie = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const moviesList = useSelector((state) => state.Movie.movies);
  //console.log(moviesList);

  const currentMovie = moviesList.find(
    (movie) => movie._id === params.movie_id
  );

  const onSubmitCallback = (movie) => {
    const movie_id = currentMovie._id;
    dispatch(editMovie(movie_id, movie)).then(() => {
      history.push("/admin/movies");
      // history.goBack();
    });
  };

  return (
    <MovieForm
      initialMovie={currentMovie}
      onSubmitCallback={onSubmitCallback}
    />
  );
};

export default EditMovie;
