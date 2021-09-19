import "./index.css";

const LegendSeats = ({ price }) => {
  return (
    <div className="legend-container">
      <div className="content-about-seats">
        <h3>Legenda</h3>

        <div className="seat-status">
          <div className="seat-free-legend">
            <p>Liber</p>
          </div>

          <div className="seat-busy-legend">
            <p>Ocupat</p>
          </div>
          <div className="seat-selected-legend">
            <p>Selectat</p>
          </div>
        </div>
      
      </div>
      <div className="total-price">
          <h3>Total</h3>
          <div className='info-price'>
          <div className="number-seats">{`X${price.countTicket} Bilete`}</div>
          <div className="price">{`${price.totalPrice} Lei`}</div>
          </div>
        </div>
    </div>
  );
};

export default LegendSeats;
