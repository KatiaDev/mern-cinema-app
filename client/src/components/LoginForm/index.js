import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestLogin from "../../actions/Auth/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ResetModal from "../ResetModal";

import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const { isAuthenticated, errorMessageLogin } = useSelector(
    (state) => state.Auth
  );

  const handleEmailChange = (event) => {
    setErrorMessage("");
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setErrorMessage("");
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    setErrorMessage(errorMessageLogin);
    event.preventDefault();
    dispatch(requestLogin(email, password));
    setErrorMessage("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage("");
      history.push("/");
    }
    if (errorMessageLogin) {
      setErrorMessage(errorMessageLogin);
    }
  }, [isAuthenticated, errorMessageLogin, history]);

  return (
    <div className="login-wrapper">
      <form onSubmit={handleFormSubmit} className="styled-form">
        <h1 className="title">Autentificare</h1>
        {errorMessage && !isAuthenticated ? (
          <div className="error-message">
            <p>{`* ${errorMessage} *`}</p>
          </div>
        ) : null}
        <input
          onChange={handleEmailChange}
          value={email}
          type="email"
          placeholder="Email"
          className="styled-input input-custom"
        ></input>
        <input
          onChange={handlePasswordChange}
          value={password}
          type="password"
          placeholder="Password"
          className="styled-input input-custom"
        ></input>
        <h3 className="styled-h3" onClick={() => setModalShow(true)}>
          Ați uitat parola?
        </h3>
        <div className="manage-acces">
          <button type="submit" className="styled-button signIn">
            Identificare
          </button>
          <Link to="/register" className=" Sign-Up">
            <button type="button" className="styled-button signUp">
              Înregistrare
            </button>
          </Link>
        </div>
      </form>
      <ResetModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default LoginForm;
