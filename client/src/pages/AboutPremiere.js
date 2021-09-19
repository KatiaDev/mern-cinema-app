import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PremiereView from "../components/PremiereView/index";
import { useEffect } from "react";

import axios from "axios";

const AboutPremiere = (props) => {
  const { id } = useParams();

  const [premiere, setPremiere] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+`/premieres/${id}`).then((premiere) => {
      setPremiere(premiere.data);
    });
  }, [id]);

  return (
    <div className="container">
      <PremiereView premiere={premiere} />
    </div>
  );
};

export default AboutPremiere;
