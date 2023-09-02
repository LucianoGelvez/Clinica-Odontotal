import React from "react";
import profilePic from "../../images/profilePic.svg";
const Dentist = (props) => {
  const especialidad = (props) => {
    switch (props) {
      case "ESPECIALIDAD_ORTODONCISTA":
        return "ORTODONCISTA";
      case "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL":
        return "CIRUGIA MAXILOFACIAL";
      case "ESPECIALIDAD_ODONTOPEDIATRIA":
        return "ODONTOPEDIATRIA";
      case "ESPECIALIDAD_ENDODONCISTA":
        return "ENDODONCISTA";
      case "ESPECIALIDAD_CIRUGIA_ORAL":
        return "CIRUGIA ORAL";
      case "ESPECIALIDAD_PERIODONCISTA":
        return "PERIODONCISTA";
      default:
        return "";
    }
  };

  return (
    <div className="container_dentist">
      {props?.img ? (
        <div>
          <img className="bring" src={props?.img} />
        </div>
      ) : (
        <div>
          <img src={profilePic} />
        </div>
      )}
      <div className="profilePic">
        <h4>
          {props.nombre} {props.apellido}
        </h4>
        <p className="text-muted">{especialidad(props.especialidad)}</p>
      </div>
    </div>
  );
};

export default Dentist;
