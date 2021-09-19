import { useDispatch, useSelector } from "react-redux";
import Seats from "../components/Seats";
import fetchSeatsPremiere from "../actions/Seat";
import fetchReservationsPremiere from "../actions/Reservation";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { addReservation } from "../actions/Reservation";
import { fetchPremiereMovies } from "../actions/Premiere";
import ChoosePaymentModal from "../components/ChoosePaymentModal";
import NotificationModal from "../components/NotificationModal";
import PaymentModal from "../components/PaymentModal";

const Reservation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const histroy = useHistory();
  const { premiere_id, cinema_id, hall_id } = useParams();

  const [modalShowChoosePayment, setModalShowChoosePayment] = useState(false);
  const [methodPayment, setMethodPayment] = useState(false);
  const [modalShowNotification, setModalShowNotification] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);

  const [finalStageReservation, setFinalStageReservation] = useState({
    seats: [],
    total_price: "",
  });

  const handleClickHideModal = (e) => {
    setModalShowNotification(false);
    histroy.push("/");
  };

  const handleClickPayMethodCard = (e) => {
    e.preventDefault();
    setModalPayment(false);
    setModalShowNotification(true);

    const reserv_hour = location.search.split("=")[2];
    const reserv_date = location.search.split("=")[1].split("&")[0];

    let seatsReservation = finalStageReservation.seats.map((el) => {
      return { _id: el.seat._id, client_type: el.client_type };
    });

    dispatch(
      addReservation(
        seatsReservation,
        premiere_id,
        reserv_date,
        reserv_hour,
        finalStageReservation.total_price,
        "Complete",
        methodPayment
      )
    );
  };

  const handleClickReservation = (seats, total_price) => (e) => {
    setFinalStageReservation({ seats: seats, total_price });
    setModalShowChoosePayment(true);
  };

  const handleClickChooseMethodPay = (e) => {
    if (methodPayment === "Cache") {
      setModalShowChoosePayment(false);
      setModalShowNotification(true);

      const reserv_hour = location.search.split("=")[2];
      const reserv_date = location.search.split("=")[1].split("&")[0];

      let seatsReservation = finalStageReservation.seats.map((el) => {
        return { _id: el.seat._id, client_type: el.client_type };
      });

      dispatch(
        addReservation(
          seatsReservation,
          premiere_id,
          reserv_date,
          reserv_hour,
          finalStageReservation.total_price,
          "Incomplete"
        )
      );
    } else if (methodPayment === "Card") {
      setModalShowChoosePayment(false);
      setModalShowNotification(false);
      setModalPayment(true);
    }
  };

  useEffect(() => {
    dispatch(fetchPremiereMovies());
    dispatch(fetchSeatsPremiere());
    dispatch(
      fetchReservationsPremiere(
        premiere_id,
        cinema_id,
        hall_id,
        location.search
      )
    );
  }, [dispatch, premiere_id, cinema_id, hall_id, location.search]);

  let { seats /*errorSeats*/ } = useSelector((state) => ({
    seats: state.Seat.seats,
    //errorSeats: state.Seat.error,
  }));

  const { reservations /*errorReservations*/ } = useSelector((state) => ({
    reservations: state.Reservation.reservations,
    //errorReservations: state.Reservation.error,
  }));

  const { premiere } = useSelector((state) => ({
    premiere: state.Premiere.premieres.find((el) => el._id === premiere_id),
  }));

  if (reservations) {
    seats = seats.map((el) => {
      for (let seat in reservations) {
        if (el._id === reservations[seat]._id) {
          return { ...el, seat_status: "busy" };
        }
      }

      return el;
    });
  }

  return (
    <div className="container">
      <Seats
        seats={seats}
        premiere={premiere}
        totalReservation={{
          reservations: reservations.length,
          seats: seats.length,
        }}
        handleClickReservation={handleClickReservation}
      ></Seats>

      <ChoosePaymentModal
        onShow={modalShowChoosePayment}
        onHide={(e) => setModalShowChoosePayment(false)}
        setMethodPayment={setMethodPayment}
        handleClickChooseMethodPay={handleClickChooseMethodPay}
      ></ChoosePaymentModal>
      <NotificationModal
        show={modalShowNotification}
        onHide={handleClickHideModal}
        title={"Cod 200: Succes !!!"}
        body={
          "Tiketul a fost expediat pe adresa electronică. Vă mulțumim că ați ales Olymp Cinema."
        }
        messageType={200}
      ></NotificationModal>
      <PaymentModal
        onShow={modalPayment}
        onHide={(e) => setModalPayment(false)}
        onSucces={(e) => setModalShowNotification(true)}
        totalPrice={finalStageReservation.total_price}
        handleClickPayMethodCard={handleClickPayMethodCard}
      ></PaymentModal>
    </div>
  );
};

export default Reservation;
