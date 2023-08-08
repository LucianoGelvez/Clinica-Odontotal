import React from 'react'
import imagen1 from '../../images/image3.jpg'
import '../../styles/componentStyles/Info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Info = () => {
  return (
    <div className='information-container'>
        <div className='information-container_aboutus'>
            <h2>Donde Encontrarnos</h2>
        <iframe  className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7135784576135!2d-75.590516299192!3d6.1690946596964835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682493b86ae61%3A0xe3a1b3e88840ab4!2sEnvigado%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1683151388243!5m2!1ses!2sco" 
          >

        </iframe>
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