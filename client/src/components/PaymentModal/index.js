import React from "react";
import { Modal } from "react-bootstrap";
import "./index.css";
const PaymentModal = ({
  onSucces,
  onShow,
  onHide,
  totalPrice,
  handleClickPayMethodCard,
}) => {

  
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={onShow}
      onHide={onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <div className="row justify-content-center">
        <div className=" col-lg-6 col-md-8">
          <div className="card p-3">
            <div className="row justify-content-center">
              <div className="col-12">
                <h2 className="heading text-center">Achitare cu Cardul</h2>
              </div>
            </div>
            <form className="form-card">
              <div className="row justify-content-center mb-4 radio-group">
                <div className="col-sm-3 col-5">
                  <div className="radio selected mx-auto" data-value="dk">
                    <img
                      className="fit-image"
                      src="https://i.imgur.com/5TqiRQV.jpg"
                      width="105px"
                      height="55px"
                      alt="pay"
                    />{" "}
                  </div>
                </div>
                <div className="col-sm-3 col-5">
                  <div className="radio mx-auto" data-value="visa">
                    <img
                      className="fit-image"
                      src="https://i.imgur.com/OdxcctP.jpg"
                      width="105px"
                      height="55px"
                      alt="pay"
                    />{" "}
                  </div>
                </div>
                <div className="col-sm-3 col-5">
                  <div className="radio mx-auto" data-value="master">
                    <img
                      className="fit-image"
                      src="https://i.imgur.com/WIAP9Ku.jpg"
                      width="105px"
                      height="55px"
                      alt="pay"
                    />
                  </div>
                </div>
                <div className="col-sm-3 col-5">
                  <div className="radio mx-auto" data-value="paypal">
                    <img
                      className="fit-image"
                      src="https://i.imgur.com/cMk1MtK.jpg"
                      width="105px"
                      height="55px"
                      alt="pay"
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="input-group">
                    <input
                      type="text"
                      name="Name"
                      placeholder="Vasile Ciocan"
                      
                    />{" "}
                    <label>Numele</label>{" "}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="input-group">
                    {" "}
                    <input
                      type="text"
                      id="cr_no"
                      name="card-no"
                      placeholder="0000 0000 0000 0000"
                      minlength="19"
                      maxlength="19"
                    />{" "}
                    <label>Numărul Cardului</label>{" "}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="input-group">
                        {" "}
                        <input
                          type="text"
                          id="exp"
                          name="expdate"
                          placeholder="MM/YY"
                          minlength="5"
                          maxlength="5"
                        />{" "}
                        <label>Data Expirării</label>{" "}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        {" "}
                        <input
                          type="password"
                          name="cvv"
                          placeholder="&#9679;&#9679;&#9679;"
                          minlength="3"
                          maxlength="3"
                        />{" "}
                        <label>CVV</label>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <input
                    onClick={handleClickPayMethodCard}
                    type="submit"
                    value={`Achită ${totalPrice} LEI`}
                    className="btn btn-pay placeicon"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
