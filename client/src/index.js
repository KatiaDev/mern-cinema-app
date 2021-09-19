import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import Auth from "./reducers/Auth";
import Movie from "./reducers/Movie";
import News from "./reducers/News";
import thunk from "redux-thunk";
import Premiere from "./reducers/Premiere";
import Seat from "./reducers/Seat";
import Reservation from "./reducers/Reservation";
import User from "./reducers/User";

const reducer = combineReducers({
  Auth,
  Movie,
  Premiere,
  Seat,
  Reservation,
  User,
  News,
});

const store = createStore(reducer, applyMiddleware(thunk));

//console.log("store: ", store.getState());

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
