import React, { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/Menu";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import AboutPremiere from "./pages/AboutPremiere";
import PrivateRoute, { AdminRoute } from "./components/PrivateRoute";
import Reservation from "./pages/Reservation";
import AdminPage from "./pages/AdminPage";
import NewsPage from "./pages/NewsPage";
import Contact from "./pages/Contact";
import ArticlePage from "./pages/ArticlePage";
import checkRegister from "./actions/Auth/CheckRegister";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, isAdmin } = useSelector((state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    isAdmin: state.Auth.isAdmin,
  }));


  useEffect(() => {
    dispatch(checkRegister());
  }, [dispatch]);

  // console.log(isAuthenticated, isAdmin);
  console.log('ENV',process.env.REACT_APP_API_URL);
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        <PrivateRoute
          path="/reservation/:premiere_id/:cinema_id/:hall_id"
          isAuthenticated={isAuthenticated}
          render={(props) => <Reservation {...props} />}
        />
        <AdminRoute
          path="/admin"
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          render={(props) => <AdminPage {...props} />}
        />
        <Route path="/about-premiere/:id" component={AboutPremiere} />
        <Route exact path="/news" component={NewsPage} />
        <Route exact path="/contacts" component={Contact} />
        <Route path="/news/:news_id" component={ArticlePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password/:user_id" component={ResetPassword} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
