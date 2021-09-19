import React from "react";
import { Modal } from "react-bootstrap";

import "./index.css";

const NotificationModal = ({onHide,show,title,body,messageType}) => {
  return (
    <Modal
      className="modal-client_type"
      onHide={onHide}
      show={show}
    
      aria-labelledby="contained-modal-title-vcenter"
      data-backdrop="static"
      centered
    >
      <Modal.Header className="header-title" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={
            messageType === 200 ? { color: "green" } : { color: "red" }
          }
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p className="text-center text-dark">{body}</p>
        <div className="info">
       
          {messageType === 200 ? (
            
            <i className="fa fa-check-circle"></i>
          ) : (
            <i className="fa fa-times-circle"></i>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;
