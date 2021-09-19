import React, { useState } from "react";
import "./index.css";
import LegendSeats from "./Legend/index";
import ClientTypeModal from "./ClientTypeModal";
import ReservationPremiere from "./ReservationPremiere";

const Seats = ({
  seats,
  premiere,
  handleClickReservation,
  totalReservation,
}) => {
  const [reservations, setReservations] = useState([]);
  const [price, setPrice] = useState({ countTicket: 0, totalPrice: 0 });
  const [modalShow, setModalShow] = React.useState({ seat: "", activ: false });

  const handleModalShow = (e) => {
    setReservations(
      reservations.filter(({ seat }) => seat._id !== modalShow.seat)
    );
    setModalShow(false);
  };

  const handleClickClientType = (e) => (clientType) => {
    setReservations(
      reservations.map((el) => {
        if (el.seat._id === reservations[reservations.length - 1].seat._id) {
          return { ...el, client_type: clientType };
        }
        return el;
      })
    );

    setPrice({
      countTicket: reservations.length,
      totalPrice: reservations.reduce((acc, curr) => {
        return acc + curr.seat.seat_price + premiere.price;
      }, 0),
    });

    setModalShow(false);
  };

  let count = 0;
  const seatHtml = seats
    .sort((a, b) =>
      a.seat_num === b.seat_num
        ? b.row_num - a.row_num
        : b.seat_num - a.seat_num
    )
    .map((el1) => {
      if (count !== el1.seat_num) {
        count = el1.seat_num;
        return (
          <div className={`cinema-row row-${el1.seat_num}`} key={el1._id}>
            {seats
              .sort((a, b) => b.seat_num - a.seat_num)
              .map((el2) => {
                if (el1.seat_num === el2.seat_num) {
                  return (
                    <div
                      key={el2._id}
                      className={
                        reservations.find(
                          ({ seat }) =>
                            seat._id === el2._id && seat.seat_status !== "busy"
                        )
                          ? `seat-selected`
                          : `seat-${el2.seat_status}`
                      }
                      onClick={(e) => {
                        if (el2.seat_status === "free") {
                          if (
                            reservations.find(
                              ({ seat }) => seat._id === el2._id
                            )
                          ) {
                            setReservations(
                              reservations.filter(
                                ({ seat }) => seat._id !== el2._id
                              )
                            );
                          } else {
                            setModalShow({ seat: el2._id, activ: true });
                            setReservations([...reservations, { seat: el2 }]);
                          }
                        }
                      }}
                    >
                      {el2.seat_status === "busy" ? null : (
                        <span className="tooltiptext">
                          <div className="t">
                            Locul {el2.seat_num}
                            <br />
                            Rîndul {el2.row_num}
                          </div>
                          {el2.seat_type}
                          <br />
                          {el2.seat_price} Lei
                        </span>
                      )}
                    </div>
                  );
                }
                return null;
              })}
          </div>
        );
      }
      return null;
    });

  return (
    <div className="container">
      <ReservationPremiere totalReservation={totalReservation} />
      <div className="theatre">
        <div className="cinema-seats left">{seatHtml}</div>
      </div>

      <LegendSeats reservations={reservations} price={price} />
      <ClientTypeModal
        handleClickClientType={handleClickClientType()}
        show={modalShow.activ}
        onHide={handleModalShow}
      />

      <div className="confirmation-container">
        <button
          className="confirmation-btn"
          onClick={handleClickReservation(reservations, price.totalPrice)}
        >
          Rezerveaza
        </button>
      </div>
    </div>
  );
};

export default Seats;
