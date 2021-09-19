import React from "react";
import "./index.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const UnauthorizedModal = (props) => {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="header-unauthorize" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cod 401: Neautorizat !!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-unauthorize">
        <h4 className = 'text-dark' >Stimate vizitator,</h4>
        <p className="text-center">
          Accesul în continuare se realizează doar cu un cont de utilizator
          activat conform politicii de scuritate impuse.
          <p className="text-center">
            Vă mulțuimim pentru înțelegere și venim cu recomandarea să selectați una din opțiunile propuse mai jos.
          </p>
        </p>
      </Modal.Body>

        <Link to="/login" className="styled-button signIn modal-btn" onClick={props.onHide}>Autentificare</Link>
        <Link to="/register" className="styled-button signUp modal-btn" onClick={props.onHide}>Înregistrare</Link>
  
    </Modal>
  );
};

export default UnauthorizedModal;
