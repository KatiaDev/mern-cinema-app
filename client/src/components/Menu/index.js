import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo1 from "../../assets/logo/olymp.png";
import logo2 from "../../assets/logo/olymp-cinema-logo.png";
import logo3 from "../../assets/logo/cinema.png";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router";
import "./index.css";

const Menu = () => {
  const location = useLocation();

  const onCilckLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  const { isAdmin } = useSelector((state) => ({
    isAdmin: state.Auth.isAdmin,
  }));
  return (
    <>
      {location.pathname.includes("/admin") ? (
        <div></div>
      ) : (
        <div className="menu">
          <div>
            <header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
              <Link to="/">
                <div className="logo-wrapper">
                  <img src={logo1} className="logo" alt="cinema" />
                  <img src={logo2} className="logo" alt="logo" />
                  <img src={logo3} className="logo" alt="olymp" />
                </div>
              </Link>
            </header>
          </div>

          <nav
            className="navbar navbar-expand-lg navbar-dark "
            aria-label="Tenth navbar example"
          >
            <div className="container-fluid">
              <div
                className="navbar-collapse justify-content-md-center"
                id="navbarsExample08"
              >
                <Navbar expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Item className="custom-link">
                        <Nav.Link eventKey="1" href="/">
                          Program
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="custom-link">
                        <Nav.Link eventKey="2" href="/news">
                          Actualități
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="custom-link">
                        <Nav.Link eventKey="3" href="/contacts">
                          Contacte
                        </Nav.Link>
                      </Nav.Item>
                      {isAdmin && (
                        <Nav.Item className="custom-link">
                          <Nav.Link eventKey="4" href="/admin">
                            Dashboard
                          </Nav.Link>
                        </Nav.Item>
                      )}

                      {localStorage.getItem("token") ? (
                        <Nav.Item
                          className="custom-link"
                          onClick={onCilckLogOut}
                        >
                          <Nav.Link eventKey="5" href="/logout">
                            Sign Out
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <Nav.Item className="custom-link">
                          <Nav.Link eventKey="6" href="/login">
                            Sign In
                          </Nav.Link>
                        </Nav.Item>
                      )}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
