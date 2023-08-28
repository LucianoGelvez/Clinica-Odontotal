import React from 'react'
import imagen1 from '../../images/image3.jpg'
import '../../styles/componentStyles/Info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import FormCustomer from '../FormCustomer'

const Info = () => {
  return (
    <div className='information-container'>
        
        
    <div className='info-text-container'>
        {/* <div className='information-container_schedule'>
        
            <h2 >Horario</h2>
            <span >Lunes-Viernes</span>
            <span >08:00 am - 5:00pm</span>
            <span >Sabado</span>
            <span >08:00 am - 12:00 md</span>
        </div> */}
        <div className='information-container_contact'>
            <h2>CONTACTO</h2>
            <h3>Dejanos tu informacion y nos pondremos en contacto en el menor tiempo posible</h3>
            {/* <div className='information-container_contact_location'>
                <FontAwesomeIcon icon={faLocationDot} className='contact-icon'/>
                <div className='information-container_contact_location_text'>
                
                <p>Calle 37 #25-30, Medellin, Ant</p>
                </div>
            </div> */}
            <div className='information-container_contact_phone'>
            <FontAwesomeIcon icon={faPhoneVolume} className='contact-icon'/>
                <p>+57 302 698 03 02</p>
                
            </div>
            <div className='information-container_contact_email'>
            <FontAwesomeIcon icon={faEnvelope} className='contact-icon'/>
                <p className='information-container_contact_email_text'>Odontotalmail@gmail.com</p>
                
            </div>
            
            
        </div>  
        </div>  
        <FormCustomer/>
    </div>
  )
}

export default Info