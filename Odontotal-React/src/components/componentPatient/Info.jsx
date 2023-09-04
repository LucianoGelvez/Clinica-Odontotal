import React from "react";
import "../../styles/componentStyles/Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormCustomer from "../FormCustomer";

const Info = () => {
  return (
    <div className="information-container">
      <div className="info-text-container">
        <div className="information-container_contact">
          <h2>CONTACTO</h2>
          <h3>
            Dejanos tu informacion y nos pondremos en contacto en el menor
            tiempo posible
          </h3>

          <div className="information-container_contact_phone">
            <FontAwesomeIcon icon={faPhoneVolume} className="contact-icon" />
            <p>+57 314 360 28 30</p>
          </div>
          <div className="information-container_contact_email">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <p className="information-container_contact_email_text">
              odontotalcontacto@gmail.com
            </p>
          </div>
        </div>
      </div>
      <FormCustomer />
    </div>
  )
}
export default Info;
