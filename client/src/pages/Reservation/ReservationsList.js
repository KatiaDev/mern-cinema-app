import React, { useEffect, useMemo, useState } from "react";
import { getAllReservations } from "../../actions/Reservation";
import getUsers from "../../actions/User";
import { useSearch } from "../../contexts/SearchContext";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Spinner, Table } from "react-bootstrap";
import { CaretUp, CaretDown } from "react-bootstrap-icons";

const ReservationsList = () => {
  const [sortState, setSortState] = useState({ key: "", direction: "" });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const { filteredData } = useSearch();
  const dispatch = useDispatch();

  const { reservations, loading, error, pageCount, users } = useSelector(
    (state) => ({
      reservations: state.Reservation.reservations,
      loading: state.Reservation.loading,
      error: state.Reservation.error,
      pageCount: state.Reservation.pageCount,
      users: state.User.users,
    })
  );
  console.log("reserv: ", reservations);

  const sortedItems = useMemo(() => {
    let sortableItems = [...filteredData];

    if (sortState !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortState.key] < b[sortState.key]) {
          return sortState.direction === "ascending" ? -1 : 1;
        }
        if (a[sortState.key] > b[sortState.key]) {
          return sortState.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortState, filteredData]);

  useEffect(() => {
    dispatch(
      getAllReservations({ limit: pageSize, skip: pageSize * pageIndex })
    );
  }, [dispatch, pageIndex, pageSize]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortState &&
      sortState.key === key &&
      sortState.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortState({ key, direction });
  };

  const getIcon = (key) => {
    if (sortState.key === key && sortState.direction === "ascending") {
      return <CaretDown className="single-icon" />;
    } else if (sortState.key === key && sortState.direction === "descending") {
      return <CaretUp className="single-icon" />;
    }
    return (
      <span className="sort-icon">
        <CaretUp /> <CaretDown />
      </span>
    );
  };

  let items = [];
  const goToNextPage = (e) => {
    setPageIndex(e.target.id);
    setActivePage(Number(e.target.text));
    dispatch(
      getAllReservations({ limit: pageSize, skip: pageSize * pageIndex })
    );
  };

  for (let number = 1; number <= pageCount; number++) {
    items.push(number);
  }

  const pages = items.map((item, index) => (
    <Pagination.Item
      id={index}
      key={item}
      active={activePage === item}
      onClick={goToNextPage}
    >
      {item}
    </Pagination.Item>
  ));
  //console.log("pages", pages);

  return (
    <>
      {loading ? (
        <div className="spinner-style">
          <Spinner animation="border" variant="light" />
        </div>
      ) : !loading && reservations ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h2>Reservations</h2>
          </div>
          <Table bordered hover variant="dark" className="table-style">
            <thead>
              <tr>
                <th className="table-col-width">#ID</th>
                <th className="table-col-width">Premiere</th>
                <th className="table-col-width">Parent_User</th>
                <th>
                  <button
                    onClick={() => handleSort("reserv_date")}
                    className="btn btn-dark sort-button"
                  >
                    Reserv_Date {getIcon("reserv_date")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("reserv_hour")}
                    className="btn btn-dark sort-button"
                  >
                    Reserv_Hour {getIcon("reserv_hour")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("total_price")}
                    className="btn btn-dark sort-button"
                  >
                    Total_Price {getIcon("total_price")}
                  </button>
                </th>

                <th>
                  <button
                    onClick={() => handleSort("status")}
                    className="btn btn-dark sort-button"
                  >
                    Status
                    {getIcon("status")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="btn btn-dark sort-button"
                  >
                    Created_At
                    {getIcon("createdAt")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedItems.map((reserv) => (
                <tr key={reserv._id}>
                  <td className="table-col-width">{reserv._id}</td>
                  <td className="table-col-width">
                    {reserv.premiere.movie.title}
                  </td>
                  <td className="table-col-width">
                    {users.map(
                      (user) => user._id === reserv.parent_user && user.email
                    )}
                  </td>
                  <td>{reserv.reserv_date.split("T", 1)}</td>
                  <td>{reserv.reserv_hour}</td>
                  <td>{reserv.total_price}</td>
                  <td>{reserv.status}</td>
                  <td>{reserv.createdAt.split("T", 1)}</td>
                  {/* <td style={{ textAlign: "center" }}>
                    <button className="btn btn-primary">Manage</button>
                  </td> */}
                  {/* <td>reserv.seats</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>{pages}</Pagination>
        </>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default ReservationsList;
