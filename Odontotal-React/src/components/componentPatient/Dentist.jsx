import React from 'react'
import profilePic from '../../images/profilePic.svg'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
const Dentist = (props) => {

  const especialidad = (props) => {
    switch(props) {
      case "ESPECIALIDAD_ORTODONCISTA":
        return "ORTODONCISTA";
      case "ESPECIALIDAD_CIRUGIA_MAXILOFACIAL":
        return "MAXILOFACIAL";
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
        <div className='container_dentist'>

    <article className='container_dentist_card'>
      <div className='container_dentist_card_specific'>
      <img src={props?.img} alt="nombre de odontologo" />
      <div className='container_dentist_card_specific_data'>
      <div className="container_dentist_card_specific_data_personal">
            <h4>{props.nombre} {props.apellido}</h4>
            <p className="text-muted">{especialidad(props.especialidad)}</p>
            <div className='footer-redes'>
          <Link><FontAwesomeIcon icon={faFacebookSquare} className='footer-redes_icon fb'/></Link>
          <Link><FontAwesomeIcon icon={faInstagramSquare} className='footer-redes_icon insta'/></Link>
          <Link><FontAwesomeIcon icon={faWhatsappSquare} className='footer-redes_icon whats'/></Link>

      </div>
      </div>
      </div>
      </div>    
    </article>

        </div>

  )
}

export default Dentist