import React from 'react'
import '../../styles/componentStyles/Footer.css'
import logo from '../../images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faFacebookSquare, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={logo} alt="" className='footer-logo_img' />
      </div>

      <div className='footer-rules'>
        <h2 className='footer-rules_text'>Derechos reservados</h2>
        <h3 className='footer-rules_text'>Junior DH</h3>
        <h4 className='footer-rules_text'>2023</h4>
      </div>

      <div className='footer-redes'>

        
        <Link><FontAwesomeIcon icon={faTwitterSquare} className='footer-redes_icon twitter'/></Link>
        <Link><FontAwesomeIcon icon={faFacebookSquare} className='footer-redes_icon fb'/></Link>
        <Link><FontAwesomeIcon icon={faInstagramSquare} className='footer-redes_icon insta'/></Link>
        <Link><FontAwesomeIcon icon={faWhatsappSquare} className='footer-redes_icon whats'/></Link>



      </div>

    </div>
  )
}

export default Footer