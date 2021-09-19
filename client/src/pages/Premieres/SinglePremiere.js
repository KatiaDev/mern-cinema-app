import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deletePremiere } from "../../actions/Premiere";
import CardCustom from "../../components/CardCustom";
import DeleteModal from "../../components/DeleteModal";
import axios from "axios";

const SinglePremiere = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { premiere_id } = params;
  const [premiere, setPremiere] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`https://api-olymp-cinema.herokuapp.com/api/premieres/${premiere_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((premiere) => {
        setPremiere(premiere.data);
      });
  }, [premiere_id]);

  const handleClickDeleteBtn = () => {
    dispatch(deletePremiere(premiere._id)).then(() => {
      history.push("/admin/premieres");
    });
  };

  return (
    <>
      <div className="container">
        <CardCustom premiere={premiere} handleShow={handleShow} />
      </div>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleClickDeleteBtn={handleClickDeleteBtn}
        text="Premiere"
      />
    </>
  );
};

export default SinglePremiere;
