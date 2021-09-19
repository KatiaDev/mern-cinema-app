import React from "react";
import "./index.css";
import { Button, Modal } from "react-bootstrap";

const ChoosePaymentModal = ({
  handleClickChooseMethodPay,
  setMethodPayment,
  onShow,
  onHide,
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={onShow}
      onHide={onHide}
    >
      <Modal.Header className="title-select-method " closeButton>
        <Modal.Title>Alege-ți modalitatea de achitare</Modal.Title>
      </Modal.Header>

      <div class="choose">
        <div className="align-credit-card">
          <div className="male-container">
            <label id="male">
              <input
                name="gender"
                type="radio"
                onChange={(e) => setMethodPayment("Card")}
              />
              <span className="span-credit-card">
                <i class="fa fa-credit-card"></i>
              </span>
            </label>
            <h6>Achitare cu Cardul</h6>
          </div>
          <div className="female-container">
            <label id="female">
              <input
                name="gender"
                type="radio"
                onChange={(e) => setMethodPayment("Cache")}
              />
              <span className="cache-method">
                <i class="fas fa-hand-holding-usd"></i>
              </span>
            </label>
            <h6>Achitare la Casă</h6>
          </div>
        </div>
      </div>
      <Button
        onClick={handleClickChooseMethodPay}
        className=" shadow-none select-method-payment"
      >
        Spre achitare
      </Button>
    </Modal>
  );
};

export default ChoosePaymentModal;
