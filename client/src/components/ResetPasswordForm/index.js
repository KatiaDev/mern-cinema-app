import React, { useState } from "react";
import "./index.css";
import { resetPassword } from "../../actions/Auth/ResetPassword";
import { useHistory, useParams } from "react-router-dom";
import NotificationModal from "../NotificationModal";

const ResetPasswordForm = () => {
  const params = useParams();
  const history = useHistory();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showModal, setModalShow] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const onSubmitResetPassword = (e) => {
    e.preventDefault();
    resetPassword(params.user_id, password.confirmPassword)
      .then((response) => {
        setErrorMessage("");
        setModalShow(response.data);
      })
      .catch((error) =>
        console.log(setErrorMessage(error.request.response.split("%")[1]))
      );
  };

  return (
    <div className="styled-form">
      <div className="card-header password-card-header">
        <h3 className="mb-0">Resetare parolă</h3>
      </div>
      {password.password !== password.confirmPassword &&
      password.confirmPassword ? (
        <p className="error-message">*Parola de confirmare nu concide*</p>
      ) : errorMessage ? (
        <p className="error-message">*{errorMessage}*</p>
      ) : null}
      <div className="card-body">
        <form className="form" autocomplete="off">
          <div className="form-group">
            <label className="label-reset" for="inputPasswordOld">
              Parola nouă:
            </label>
            <input
              name="password"
              onChange={onChangePassword}
              type="password"
              className="form-control"
              id="inputPasswordOld"
              required
            ></input>
          </div>
          <div className="form-group">
            <label className="label-reset" for="inputPasswordNew">
              Confirmare parolă:
            </label>
            <input
              name="confirmPassword"
              onChange={onChangePassword}
              type="password"
              className="form-control"
              id="inputPasswordNew"
              required
            ></input>
          </div>
          <div className="form-save">
            <button
              type="submit"
              className="styled-button signIn save-new-password"
              onClick={onSubmitResetPassword}
            >
              Salvează
            </button>
          </div>
        </form>
      </div>
      {showModal ? (
        <NotificationModal
          show={true}
          onHide={(e)=> history.push('/')}
          title={showModal.title}
          body={showModal.body}
          messageType={showModal.messageType}
        ></NotificationModal>
      ) : null}
    </div>
  );
};

export default ResetPasswordForm;
