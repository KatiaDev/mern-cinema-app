import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

const ReservationPremiere = ({ totalReservation }) => {
  const location = useLocation();
  const { premiere_id, cinema_id, hall_id } = useParams();
  const [premiere, setPremiere] = useState({
    hall: "xxx",
    cinema: "xxx",
    movie: "xxx",
    img: "xxx",
    age_restrict: "xxx",
    price: "xxxx",
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/premieres/${premiere_id}`)
      .then((premiere) => {
        console.log("Premiere", premiere);
        setPremiere({
          hall: premiere.data.hall.find((el) => el._id === hall_id).name,
          cinema: premiere.data.cinema.find((el) => el._id === cinema_id).name,
          img: premiere.data.movie.image_url,
          movie: premiere.data.movie.title,
          age_restrict: premiere.data.movie.age_restrict,
          price: premiere.data.price,
        });
      });
  }, [premiere_id, cinema_id, hall_id]);

  return (
    <div className="card reservation-premiere">
      <div className="card-header">
        Informații despre rezervare <p>{premiere.movie}</p>
      </div>
      <div className="card-body body-info-reservation">
        <div className="img-premiere-reserv ">
          <img src={premiere.img} alt="..." className="img-thumbnail"></img>
        </div>
        <div className="info-reservation">
          <div className="info-1">
            <div>
              <p>
                <b>Cinematograf: </b>
                {premiere.cinema}
              </p>
            </div>
            <div>
              <p>
                <b>Sala: </b> {premiere.hall}
              </p>
            </div>
          </div>
          <div className="info-2">
            <div>
              <p>
                <b>Data: </b>
                {location.search.split("=")[1].split("&")[0]}
              </p>
            </div>
            <div>
              <p>
                <b>Ora: </b>
                {location.search.split("=")[2]}
              </p>
            </div>
          </div>
          <div className="info-3">
            <div>
              <p>
                <b>Locuri disponibile:</b>{" "}
                {totalReservation.seats - totalReservation.reservations} /{" "}
                {totalReservation.seats}
              </p>
            </div>
            <div>
              <p>
                <b>Restricții de vîrstă:</b> {premiere.age_restrict}
              </p>
            </div>
            <div>
              <p>
                <b>Costul sesiunii:</b> {premiere.price} Lei
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPremiere;
