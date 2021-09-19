import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../../../contexts/SearchContext";
import logo1 from "../../../assets/logo/olymp.png";
import logo2 from "../../../assets/logo/olymp-cinema-logo.png";
import logo3 from "../../../assets/logo/cinema.png";

import "./index.css";

const Header = () => {
  const { search, setSearch } = useSearch();
  const searchRef = useRef(null);

  const handleSearchClear = useCallback(() => setSearch(""), [setSearch]);

  return (
    <>
      <header className="navbar navbar-dark header-style sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link
          className="navbar-brand col-md-3 col-lg-2 me-0 text-center "
          to="/"
        >
          <div className="logo-wrapp">
            <img src={logo1} className="company-logo" alt="cinema" />
            <img src={logo2} className="company-logo" alt="logo" />
            <img src={logo3} className="company-logo" alt="olymp" />
          </div>
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          ref={searchRef}
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button className="btn btn-dark btn-md" onClick={handleSearchClear}>
              Clear Search
            </button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
