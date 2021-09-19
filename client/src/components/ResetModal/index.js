import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { requestResetPassword } from "../../actions/Auth/ResetPassword";
import NotificationModal from "../NotificationModal";

const ResetModal = (props) => {
  const [email, setEmail] = useState("");
  const [modal, setShowModal] = useState(false);
  const [stateNotification, setStateNotification] = useState({});

  const onSubmitResetPassword = (e) => {
    setShowModal(true);
    requestResetPassword(email).then((response) => {
      setStateNotification(response);
    });
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "black" }}
          >
            Resetarea Parolei
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "black" }}>
            Introduceți adresa de email pe care ați folosit-o la înregistrare
          </p>
          <input
            type="email"
            className="styled-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmitResetPassword}>Trimite</Button>

          <Button onClick={props.onHide} style={{ background: "red" }}>
            Anuleaza
          </Button>
        </Modal.Footer>
      </Modal>

      <NotificationModal
        show={modal}
        onHide={(e) => {
          setShowModal(false);
        }}
        title={stateNotification.title}
        body={stateNotification.body}
        messageType={stateNotification.messageType}
      ></NotificationModal>
    </>
  );
};
export default ResetModal;
