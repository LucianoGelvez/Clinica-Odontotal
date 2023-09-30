import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import "../../styles/componentStyles/Detail.css";

const Detail = () => {
  const details = [
    {
      image: <FontAwesomeIcon icon={faUsers} />,
      title: "Profesionales",
      description:
        "Nuestra clínica cuenta con especialistas odontológicos altamente capacitados",
    },
    {
      image: <FontAwesomeIcon icon={faCreditCard} />,
      title: "Métodos de pago",
      description:
        "Ofrecemos varios métodos de pago para adaptarnos a las necesidades individuales de nuestros pacientes.",
    },
    {
      image: <FontAwesomeIcon icon={faHourglass} />,
      title: "Tiempo de espera",
      description:
        "Minimizamos los tiempos de espera de nuestros pacientes para brindar un servicio eficiente y rápido.",
    },
    {
      image: <FontAwesomeIcon icon={faCalendarDays} />,
      title: "Horario de atención",
      description:
        "Ofrecemos una amplia gama de horarios de atención, incluyendo fines de semana y días feriados.",
    },
  ];

  return (
    <div className="main-datail">
      <h2>
        "Una sonrisa es la luz en tu ventana que muestra que tu corazón está en
        casa".
      </h2>

      <div className="detail-container">
        {details.map((detail, index) => (
          <div className="detail-box" key={index}>
            <div className="detail-image">{detail.image}</div>
            <div className="detail-title">{detail.title}</div>
            <p className="detail-description">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
