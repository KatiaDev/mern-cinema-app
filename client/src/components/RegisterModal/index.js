import React from "react";
import { Modal } from "react-bootstrap";
import "./index.css";

const RegisterModal = (props) => {
  return (
    <Modal
      className="modal-client_type"
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="header-succes" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "black" }}
        >
          Cod 200: Succes !!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="info-succes">
          <p>
            Înregistrare cu succes, vă rugăm să verificați poșta electronică timp de 30 minute
            pentru a finaliza înregistrarea. 
          </p>
          <i class="fa fa-check-circle"></i>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
