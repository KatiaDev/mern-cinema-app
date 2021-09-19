import React from "react";
import "./index.css";
const MapForm = () => {
  return (
    <div className="container-map">
      <div className="bg-dark description-location">
        <div className="section-cinema">
          <p>
            Cinematograful <i className="fa fa-film" aria-hidden="true"></i>
          </p>
          <p>Cinema Olymp Centru</p>
        </div>
        <div className="section-address">
          <p>
            Adresa <i className="fa fa-street-view" aria-hidden="true"></i>
          </p>
          <p>mun.Chișinău, bd. Ștefan cel Mare, 128</p>
        </div>
        <div className="section-tel">
          <p>
            Telefon <i className="fa fa-phone" aria-hidden="true"></i>
          </p>
          <p>060 88 68 63</p>
        </div>
        <div className="section-email">
          <p>
            Email <i className="fa fa-envelope" aria-hidden="true"></i>
          </p>
          <p>olymp.cinema@gmail.com</p>
        </div>
      </div>
      <iframe
        title="location-maps"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Chi%C8%99in%C4%83u,%20bd.%20%C8%98tefan%20cel%20Mare,%20128+(Cinema%20Olymp%20Centru)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height="600"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default MapForm;
