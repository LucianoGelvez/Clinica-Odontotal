import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


import '../../styles/componentStyles/Detail.css'

const Detail = () => {

    const details = [{
        image:<FontAwesomeIcon icon={faUsers}  /> ,
        title: "Profesionales" ,
        description:"Nuestra clínica cuenta con especialistas odontológicos altamente capacitados"+
         "dedicados a brindar atención personalizada y de calidad. Confía en nosotros para el cuidado"+
         "de tu sonrisa y la mejora de tu salud dental."
    },
    {
        image:<FontAwesomeIcon icon={faCreditCard} /> ,
        title: "Metodos de pago" ,
        description:"Ofrecemos varios métodos de pago para adaptarnos a las necesidades individuales de nuestros pacientes."+
        "Queremos que tu experiencia con nosotros sea lo más cómoda posible."
    },
    {
        image:<FontAwesomeIcon icon={faHourglass} /> ,
        title: "Tiempo de espera" ,
        description:"Minimizamos los tiempos de espera de nuestros pacientes para brindar un servicio eficiente y rápido."+
        "Queremos que tu visita sea lo más conveniente y cómoda posible."
    },
    {
        image:<FontAwesomeIcon icon={faCalendarDays} /> ,
        title: "Horario de atencion" ,
        description:"Ofrecemos una amplia gama de horarios de atención, incluyendo fines de semana y días feriados."+
        " Nos aseguramos de que nuestros pacientes reciban la atención que necesitan en un horario que se adapte a sus necesidades."
    }
    ];

    
        return (

           
          <div className="detail-container">
            {details.map((detail, index) => (
              <div className="detail-box" key={index}>
                <div className="detail-image">{detail.image}</div>
                <div className="detail-title">{detail.title}</div>
                <div className="detail-description">{detail.description}</div>
            </div>
            
            ))}
            
            
        </div>
        )
    };

export default Detail