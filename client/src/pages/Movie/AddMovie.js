import React from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../../actions/Movie";
import MovieForm from "../../components/MovieForm";

const AddMovie = () => {
  const dispatch = useDispatch();

  const onSubmitCallback = (movie) => {
    dispatch(addMovie(movie));
  };

  return <MovieForm onSubmitCallback={onSubmitCallback} />;
};

export default AddMovie;
