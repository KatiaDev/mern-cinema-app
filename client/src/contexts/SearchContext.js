import React, { createContext, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchParam] = useState(["title", "subtitle", "content"]);

  const { movies, news, reservations, users } = useSelector((state) => ({
    movies: state.Movie.movies,
    news: state.News.news,
    reservations: state.Reservation.reservations,
    users: state.User.users,
  }));

  let location = useLocation();
  let pathname = location.pathname;

  const filteredData = useMemo(() => {
    switch (pathname) {
      case "/admin/movies":
        if (!search) {
          return movies;
        }
        return movies.filter(({ title }) =>
          title.toLowerCase().includes(search)
        );

      case "/admin/news":
        if (!search) {
          return news;
        }
        return news.filter((article) => {
          return searchParam.some((item) => {
            return (
              article[item]
                .toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
            );
          });
        });

      case "/admin/reservations":
        if (!search) {
          return reservations;
        }
        return reservations.filter(({ _id }) => _id.includes(search));

      case "/admin/users":
        if (!search) {
          return users;
        }
        return users.filter(({ email }) => email.includes(search));
      default:
        return [];
    }
  }, [search, searchParam, pathname, movies, news, reservations, users]);

  const value = {
    search,
    setSearch,
    filteredData,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
