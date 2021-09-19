import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import requestRegister from "../../actions/Auth/Register";
import NotificationModal from "../NotificationModal";
import "./index.css";

const RegisterForm = () => {
  const history = useHistory();

  const [inputRegister, setInputRegister] = useState({});

  const { isRegister, responseMessage, errorMessageRegister } = useSelector(
    (state) => state.Auth
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestRegister(inputRegister));
  };

  // useEffect(() => {
  //   if (isRegister) {
  //     setModalShow(true);
  //   }
  // }, [isRegister]);

  const handleInputChange = (e) => {
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-wrapper">
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <form className="styled-form">
          <h1 className="title">Înregistrare</h1>
          {errorMessageRegister && !isRegister ? (
            <div className="error-message">
              <p>{`* ${errorMessageRegister} *`}</p>
            </div>
          ) : null}
          <label>Numele:</label>
          <input
            name="firstname"
            type="text"
            required
            placeholder="Numele"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Prenumele:</label>
          <input
            name="lastname"
            required
            type="text"
            placeholder="Prenumele"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Vîrsta:</label>
          <input
            name="age"
            type="text"
            required
            placeholder="Vîrsta"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Username:</label>
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Parola:</label>
          <input
            required
            name="password"
            type="password"
            placeholder="Parola"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <label>Tel.mobil:</label>
          <input
            required
            name="mobile"
            type="mobile"
            placeholder="mobil"
            className="styled-input"
            onChange={handleInputChange}
          ></input>
          <button
            className="styled-button signUp-register"
            onClick={handleSubmit}
          >
            Registrează
          </button>
        </form>
        {isRegister ? (
          <NotificationModal
            show={isRegister}
            onHide={(e) => {
              history.push("/");
            }}
            title={responseMessage.title}
            body={responseMessage.body}
            messageType={responseMessage.messageType}
          ></NotificationModal>
        ) : null}
      </Container>
    </div>
  );
};

export default RegisterForm;
