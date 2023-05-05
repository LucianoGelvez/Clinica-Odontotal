import React from 'react'
import imagen1 from '../../images/image3.jpg'
import '../../styles/componentStyles/Info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Info = () => {
  return (
    <div className='information-container'>
        <div className='information-container_aboutus'>
            <img src={imagen1} alt="" />
            <h2>Bienvenidos a Odontotal Odontologia</h2>
            <p>¡Bienvenido a nuestra clínica dental! Estamos comprometidos en brindarle una atención personalizada y de alta calidad para mejorar su salud bucal y su sonrisa.</p>
        </div>
        <div className='information-container_schedule'>
            <h2 className='information-container_schedule_title'>Horario</h2>
            <span className='information-container_schedule_days'>Lunes-Viernes</span>
            <span className='information-container_schedule_hour'>08:00 am - 5:00pm</span>
            <span className='information-container_schedule_days'>Sabado</span>
            <span className='information-container_schedule_hour'>08:00 am - 12:00 md</span>
        </div>
        <div className='information-container_contact'>
            <h2>Contact</h2>
            <div className='information-container_contact_location'>
                <FontAwesomeIcon icon={faLocationDot} className='contact-icon'/>
                <div className='information-container_contact_location_text'>
                <p style={{fontWeight:'bold'}}>Medellin, Antioquia</p>
                <p>Calle 37 #25-30</p>
                </div>
            </div>
            <div className='information-container_contact_phone'>
            <FontAwesomeIcon icon={faPhoneVolume} className='contact-icon'/>
                <p>+57 302 698 03 02</p>
                
            </div>
            <div className='information-container_contact_email'>
            <FontAwesomeIcon icon={faEnvelope} className='contact-icon'/>
                <p className='information-container_contact_email_text'>Odontotal@gmail.com</p>
                
            </div>
            
            
        </div>    
    </div>
  )
}

export default Info