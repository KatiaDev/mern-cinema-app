import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "./index.css";

const Dashboard = ({ children }) => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  //console.log("children.props.children", children.props.children);
  return (
    <div className="main-container">
      <Header />
      <div className="container-fluid ">
        <div className="row">
          <Navbar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button className="btn btn-datetime">
                    <svg
                      width="280px"
                      height="60px"
                      viewBox="0 0 280 60"
                      className="border svg-style"
                    >
                      <polyline
                        points="279,1 279,59 1,59 1,1 279,1"
                        className="bg-line"
                      />
                      <polyline
                        points="279,1 279,59 1,59 1,1 279,1"
                        className="hl-line"
                      />
                    </svg>
                    <span>
                      {dateState.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>
                      {" "}
                      {dateState.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="main-div">{children}</div>
          </main>
        </div>
      </div>
    </div> //main-container
  );
};

export default Dashboard;
