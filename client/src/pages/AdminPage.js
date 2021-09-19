import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import SearchProvider from "../contexts/SearchContext";
import ZingChart from "zingchart-react";
import Dashboard from "../components/Dashboard";
import MoviesList from "./Movie/MoviesList";
import AddMovie from "./Movie/AddMovie";
import EditMovie from "./Movie/EditMovie";
import SingleMovie from "./Movie/SingleMovie";
import PremieresList from "./Premieres/PremieresList";
import chartFirst from "../components/Dashboard/Charts/ChartFirst";
// import chartSecond from "../components/Dashboard/Charts/ChartSecond";
// import chartThird from "../components/Dashboard/Charts/ChartThird";
import SinglePremiere from "./Premieres/SinglePremiere";
import EditPremiere from "./Premieres/EditPremiere";
import AddPremiere from "./Premieres/AddPremiere";
import NewsList from "./News/NewsList";
import NewsArticle from "./News/NewsArticle";
import AddNews from "./News/AddNews";
import EditNews from "./News/EditNews";
import ReservationsList from "./Reservation/ReservationsList";
import UsersList from "./User/UsersList";

const AdminPage = () => {
  const [moviesChart, setMoviesChart] = useState({});
  // const [usersChart, setUsersChart] = useState({});
  // const [metricsChart, setMetricsChart] = useState({});

  useEffect(() => {
    setMoviesChart(chartFirst);
    // setUsersChart(chartSecond);
    // setMetricsChart(chartThird);
  }, []);

  //console.log("chart: ", chart);
  return (
    <>
      <SearchProvider>
        <Dashboard>
          <Switch>
            <Route
              exact
              path="/admin/users"
              render={(props) => <UsersList {...props} />}
            />
            <Route
              exact
              path="/admin/reservations"
              render={(props) => <ReservationsList {...props} />}
            />
            <Route
              exact
              path="/admin/news/news-edit/:news_id"
              render={(props) => <EditNews {...props} />}
            />
            <Route
              exact
              path="/admin/news/news-add"
              render={(props) => <AddNews {...props} />}
            />
            <Route
              exact
              path="/admin/news/:news_id"
              render={(props) => <NewsArticle {...props} />}
            />
            <Route
              exact
              path="/admin/news"
              render={(props) => <NewsList {...props} />}
            />

            <Route
              exact
              path="/admin/premieres/premiere-edit/:premiere_id"
              render={(props) => <EditPremiere {...props} />}
            />
            <Route
              exact
              path="/admin/premieres/premiere-add"
              render={(props) => <AddPremiere {...props} />}
            />
            <Route
              exact
              path="/admin/premieres/:premiere_id"
              render={(props) => <SinglePremiere {...props} />}
            />
            <Route
              exact
              path="/admin/premieres"
              render={(props) => <PremieresList {...props} />}
            />
            <Route
              exact
              path="/admin/movies"
              render={(props) => <MoviesList {...props} />}
            />
            <Route
              exact
              path="/admin/movies/movie-add"
              render={(props) => <AddMovie {...props} />}
            />
            <Route
              exact
              path="/admin/movies/movie-edit/:movie_id"
              render={(props) => <EditMovie {...props} />}
            />
            <Route
              exact
              path="/admin/movies/:movie_id"
              render={(props) => <SingleMovie {...props} />}
            />
            <Route
              exact
              path="/admin"
              render={(props) => (
                <div>
                  <ZingChart {...props} data={moviesChart.config} />
                  {/* <ZingChart {...props} data={usersChart.config} />
                  <ZingChart {...props} data={metricsChart.config} /> */}
                </div>
              )}
            />
          </Switch>
        </Dashboard>
      </SearchProvider>
    </>
  );
};

export default AdminPage;
