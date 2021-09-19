import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./index.css";

const ClientTypeModal = (props) => {
  const [clientType, setClientType] = useState();

  return (
    <Modal className ='modal-client_type'
      onHide={props.onHide}
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "black" }}
        >
          Categoria de vîrstă
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group">
          <select
            className="custom-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="Alege..." selected disabled>Alege...</option>
            <option value="Copil">Copil (AG)</option>
            <option value="Elev">Elev (AP-12,N-15)</option>
            <option value="Student">Student (IM-18)</option>
            <option value="Adult">Adult (IM-18)</option>
            <option value="Pensionar">Pensionar (IM-18)</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => props.handleClickClientType(clientType)}>
          Selectează
        </Button>
      </Modal.Footer>
    </Modal>
    
  );
};
export default ClientTypeModal;
