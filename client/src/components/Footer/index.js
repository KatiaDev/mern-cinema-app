import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { useLocation } from "react-router";
import "./index.css";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes("/admin") ? (
        <div></div>
      ) : (
        <footer className="page-footer font-small stylish-color-dark pt-4 footer-style">
          <div className="container text-center text-md-left">
            <div className="row">
              <div className="col-md-4 mx-auto">
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  Despre Noi
                </h5>
                <p>
                  Olymp Cinema va ofera o experienta cinematografica de exceptie
                  prin cele 7 sali confortabile în cele 3 locaţii, peste 1.000
                  de locuri, ambianta premium, ecrane adaptate fiecarei săli,
                  confort prin fotolii de calitate superioara si tehnologie de
                  ultima generatie.
                </p>
              </div>

              <hr className="clearfix w-100 d-md-none" />

              <div className="col-md-2 mx-auto">
                <h6 className="font-weight-bold text-uppercase mt-3 mb-4 h5-color">
                  Meniu
                </h6>

                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="link-color">
                      Acasa
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Program
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Noutati
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Contacte
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Account
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Preturi
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              <hr className="clearfix w-100 d-md-none" />

              <div className="col-md-2 mx-auto">
                <h6 className="font-weight-bold text-uppercase mt-3 mb-4 h5-color">
                  Link-uri Utile
                </h6>

                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="link-color">
                      Rezervari
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Plati
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Politica Cookie
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Termeni de utilizare
                    </Link>{" "}
                  </li>
                  <li>
                    <Link to="/" className="link-color">
                      Politica de confidentialitate
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              <hr className="clearfix w-100 d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold h5-color">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Chisinau, MD-2198
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  olymp.cinema@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 060 886 863
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 022 234 567
                </p>
              </div>
            </div>
          </div>
          <hr />

          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <SocialIcon url="https://facebook.com" />
            </li>
            <li className="list-inline-item">
              <SocialIcon url="https://instagram.com" />
            </li>
            <li className="list-inline-item">
              <SocialIcon url="https://linkedin.com" />
            </li>
            <li className="list-inline-item">
              <SocialIcon url="https://youtube.com" />
            </li>
          </ul>
          <div className="footer-copyright text-center py-3 footer-copy link-color">
            © 2021 Copyright Olymp Cinema
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
