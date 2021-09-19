import React, { useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import UnauthorizedModal from "../UnauthorizedModal";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const [modalShow, setModalShow] = useState(true);
  const history = useHistory();

  const onClickRead = (e) => {
    setModalShow(false);
    history.push("/login");
  };

  if (!isAuthenticated) {
    return <UnauthorizedModal show={modalShow} onHide={onClickRead} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;

export const AdminRoute = ({ isAuthenticated, isAdmin, ...props }) => {
  if ((!isAuthenticated && !isAdmin) || (isAuthenticated && !isAdmin)) {
    return <Redirect exact from="/" to="/login" />;
  }
  return <Route {...props} />;
};
