import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ show, handleClose, handleClickDeleteBtn, text }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{ color: "black" }}
          >{`Delete ${text}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          Are you sure you want to delete this {text} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClickDeleteBtn}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
