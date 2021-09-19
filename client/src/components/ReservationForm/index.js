import React, { useState } from "react";
import "./index.css";

import { Link } from "react-router-dom";

const ReservationForm = ({ premiere }) => {
  const [reservation, setReservation] = useState({
    premiere: premiere._id,
    cinema: "",
    hall: "",
    date: "",
    hour: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "hall") {
      premiere.hall.find((hall) =>
        hall.name === e.target.value
          ? setReservation({ ...reservation, [e.target.name]: hall._id })
          : " "
      );
    } else if (e.target.name === "cinema") {
      premiere.cinema.find((cinema) =>
        cinema.name === e.target.value
          ? setReservation({ ...reservation, [e.target.name]: cinema._id })
          : " "
      );
    } else {
      setReservation({
        ...reservation,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
      <div className="container">
        <div className="form-header">
          <h1 className="booking-title">Rezerveaza</h1>
        </div>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <div className="booking-form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  {" "}
                  <input
                    className="form-control"
                    type="date"
                    min={premiere.premiere_start_date.split("T", 1).toString()}
                    max={premiere.premiere_end_date.split("T", 1).toString()}
                    name="date"
                    required
                    onChange={handleInputChange}
                  />{" "}
                  <span className="form-label">Selecteaza Data</span>{" "}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  {" "}
                  <select
                    className="form-control"
                    name="hour"
                    required
                    onChange={handleInputChange}
                  >
                    <option value="" hidden>
                      Selecteaza Ora
                    </option>

                    {premiere.interval_hours.map((hour, idx) => {
                      return <option key={idx}>{hour}</option>;
                    })}
                  </select>{" "}
                  <span className="select-arrow"></span>{" "}
                  <span className="form-label">Ora</span>{" "}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  {" "}
                  <select
                    className="form-control"
                    name="cinema"
                    required
                    onChange={handleInputChange}
                  >
                    <option value="" hidden>
                      Selecteaza Cinematograf
                    </option>
                    {premiere.cinema.map((cinema, idx) => {
                      return <option key={idx}>{cinema.name}</option>;
                    })}
                  </select>
                  <span className="select-arrow"></span>{" "}
                  <span className="form-label">Cinematograf</span>{" "}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  {" "}
                  <select
                    className="form-control"
                    name="hall"
                    required
                    onChange={handleInputChange}
                  >
                    <option value="" hidden>
                      Selecteaza Sala
                    </option>
                    {premiere.hall.map((hall, idx) => {
                      return <option key={idx}>{hall.name}</option>;
                    })}
                  </select>{" "}
                  <span className="select-arrow"></span>{" "}
                  <span className="form-label">Sala</span>{" "}
                </div>
              </div>
            </div>
          </div>
          <div style={{ alignSelf: "center", marginTop: "25px" }}>
            { 
            reservation.hour !== "" &&
            reservation.premiere !== "" &&
            reservation.date !== "" &&
            reservation.hall !== "" &&
            reservation.cinema !== "" ? (
              <Link
                to={`/reservation/${reservation.premiere}/${reservation.cinema}/${reservation.hall}?date=${reservation.date}&hour=${reservation.hour}`}
              >
                <button className="btn submit-btn">Continua</button>
              </Link>
            ) : (
              <button className="btn submit-btn">Continua</button>
            )}
          </div>
        </form>
      </div>
  
  );
};

export default ReservationForm;
