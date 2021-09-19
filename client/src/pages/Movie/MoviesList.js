import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../actions/Movie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FilterCustom from "../../components/FilterCustom";
import { useSearch } from "../../contexts/SearchContext";
import { Button, Card, Spinner, Pagination } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const MoviesList = () => {
  const [filterOptions, setFilterOptions] = useState({
    genre: "",
    release_date: "",
    age_restrict: "",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(12);
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const { filteredData } = useSearch();

  const { movies, loading, error, pageCount } = useSelector((state) => ({
    movies: state.Movie.movies,
    error: state.Movie.error,
    loading: state.Movie.loading,
    pageCount: state.Movie.pageCount,
  }));

  useEffect(() => {
    dispatch(getMovies({ limit: pageSize, skip: pageSize * pageIndex }));
  }, [dispatch, pageSize, pageIndex]);

  const filteredItems = useMemo(() => {
    let items = [...filteredData];

    if (filterOptions.age_restrict !== "") {
      return items.filter(
        (movie) => movie.age_restrict === filterOptions.age_restrict
      );
    }
    if (filterOptions.genre !== "") {
      return items.filter((movie) => movie.genre.includes(filterOptions.genre));
    }
    if (filterOptions.release_date !== "") {
      return items.filter(
        (movie) =>
          movie.release_date.split("T", 1).toString() ===
          filterOptions.release_date
      );
    }
    return items;
  }, [filterOptions, filteredData]);

  //console.log("filteredItems", filteredItems);

  const resetFilter = () => {
    setFilterOptions({
      genre: "",
      release_date: "",
      age_restrict: "",
    });
  };

  let items = [];
  const goToNextPage = (e) => {
    setPageIndex(e.target.id);
    setActivePage(Number(e.target.text));
    dispatch(getMovies({ limit: pageSize, skip: pageSize * pageIndex }));
  };

  for (let number = 1; number <= pageCount; number++) {
    items.push(number);
  }

  const pages = items.map((item, index) => (
    <Pagination.Item
      id={index}
      key={item}
      active={activePage === item}
      onClick={goToNextPage}
    >
      {item}
    </Pagination.Item>
  ));

  return (
    <>
      {loading ? (
        <div className="spinner-style">
          <Spinner animation="border" variant="light" />
        </div>
      ) : !loading && movies ? (
        <>
          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2>Movies</h2>
              <FilterCustom
                addButtonTitle="Add Movie"
                pathName="/admin/movies/movie-add"
              >
                <ListGroup.Item>
                  <select
                    className="form-control search-slt"
                    id="exampleFormControlSelect1"
                    value={filterOptions.genre}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        genre: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden>
                      Genre
                    </option>
                    <option value="Acțiune">Acțiune</option>
                    <option value="Comedie">Comedie</option>
                    <option value="Crimă">Crimă</option>
                    <option value="Aventuri">Aventuri</option>
                    <option value="Animație">Animație</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                  </select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <input
                    type="date"
                    className="form-control search-slt"
                    placeholder="Release Date"
                    value={filterOptions.release_date}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        release_date: e.target.value,
                      })
                    }
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <select
                    className="form-control search-slt"
                    id="exampleFormControlSelect1"
                    value={filterOptions.age_restrict}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        age_restrict: e.target.value,
                      })
                    }
                  >
                    <option value="" hidden>
                      Age Restrict
                    </option>
                    <option value="AG">AG</option>
                    <option value="AP-12">AP-12</option>
                    <option value="N-15">N-15</option>
                    <option value="IM-18">IM-18</option>
                  </select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={resetFilter}
                    className="btn btn-secondary wrn-btn"
                  >
                    Reset Filter
                  </Button>
                </ListGroup.Item>
              </FilterCustom>
            </div>
            {filteredItems.map((movie) => {
              return (
                <Link
                  to={`/admin/movies/${movie._id}`}
                  key={movie._id}
                  style={{
                    width: 250,
                    marginLeft: 20,
                    textDecoration: "none",
                  }}
                >
                  {movie ? (
                    <Card className="mb-3">
                      <Card.Img
                        variant="top"
                        src={movie?.image_url}
                        className="card-img-top movie_card_img"
                      />
                      <Card.Body>
                        <Card.Title
                          style={{
                            color: "black",
                            width: "content-width",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {movie?.title}
                        </Card.Title>
                        <Card.Footer>
                          <span className="movie_info">
                            {movie?.release_date.split("T")[0].split("-")[0]}
                          </span>
                          <span className="movie_info float-right">
                            <i className="fas fa-star"></i> {movie?.rating}
                          </span>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  ) : null}
                </Link>
              );
            })}
          </div>
          <Pagination style={{ marginLeft: "25px", marginTop: "10px" }}>
            {pages}
          </Pagination>
        </>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default MoviesList;
