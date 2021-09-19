import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import "./index.css";

const FilterCustom = ({ children, addButtonTitle, pathName }) => {
  return (
    <>
      <ListGroup horizontal="lg" className="m-0">
        <ListGroup.Item>
          <Link to={pathName}>
            <Button
              className="btn btn-secondary wrn-btn"
              style={{ background: "green" }}
            >
              {addButtonTitle}
            </Button>
          </Link>
        </ListGroup.Item>

        {children}
      </ListGroup>
    </>
  );
};

export default FilterCustom;
