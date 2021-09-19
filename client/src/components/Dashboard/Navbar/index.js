import React from "react";
import { NavLink } from "react-router-dom";
import {
  PersonSquare,
  Film,
  CameraReelsFill,
  FileEarmarkPost,
  BookmarkHeartFill,
  Speedometer2,
  Cash,
  BellFill,
  GeoAltFill,
  Coin,
  ZoomIn,
} from "react-bootstrap-icons";

import "./index.css";

const Navbar = () => {
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar  collapse"
      >
        <div className="position-sticky sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link active listItem"
                aria-current="page"
                href="/admin"
              >
                <Speedometer2 className="mr-2" />
                Dashboard
              </a>
            </li>
            <li className="nav-item ">
              <NavLink exact to="/admin/users" className="nav-link listItem">
                <PersonSquare className="mr-2" />
                Users
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink exact to="/admin/movies" className="nav-link listItem">
                <Film className="mr-1" /> Movies
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                exact
                to="/admin/reservations"
                className="nav-link listItem"
              >
                <BookmarkHeartFill className="mr-1" /> Reservations
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink exact to="/admin/news" className="nav-link listItem">
                <FileEarmarkPost className="mr-1" /> News
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                exact
                to="/admin/premieres"
                className="nav-link listItem"
              >
                <CameraReelsFill className="mr-1" /> Premieres
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink exact to="/admin/tickets" className="nav-link listItem">
                <Cash className="mr-2" />
                Tickets
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink
                exact
                to="/admin/notifications"
                className="nav-link listItem"
              >
                <BellFill className="mr-2" />
                Notifications
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink exact to="/admin/cinemas" className="nav-link listItem">
                <GeoAltFill className="mr-2" />
                Cinemas
              </NavLink>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Reports</span>
            <a
              className="link-secondary listItem"
              href="/saved"
              aria-label="Add a new report"
            >
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link listItem" href="/current">
                <Coin className="mr-2" />
                Sales
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link listItem" href="/sales">
                <ZoomIn className="mr-2" />
                Metrics
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
