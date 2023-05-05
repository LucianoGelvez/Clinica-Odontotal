import React from 'react'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import imagen1  from '../../images/image1.jpg'
import imagen2  from '../../images/image2.png'
import imagen3  from '../../images/image3.jpg'
import './../../styles/componentStyles/Slider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'

// import '../../../styles/componentStyles/MainSlaider.css'
function Slider() {
  return (

   <div className='container-first'>
      
    <Carousel className='carousel-container'>
      
      <Carousel.Item className='carousel-container_item'>
        <img className='carousel-container_item_img'
          src={imagen1}
          alt="First slide" 
        />
        <Carousel.Caption className='carousel-container_text firstText'>
          <p>"Una sonrisa saludable es tu mejor accesorio".</p>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-container_item'>
        <img className='carousel-container_item_img'
          src={imagen2}
          alt="Second slide" 
        />
        <Carousel.Caption  className='carousel-container_text secondText' >
        
        <p>"Un diente sano es un regalo para toda la vida"</p>
        
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className='carousel-container_item'>
        <img className='carousel-container_item_img'
          src={imagen3}
          alt="Third slide" 
        />
        <Carousel.Caption  className='carousel-container_text thirdText'>
        
        <p>"Una sonrisa bonita comienza con una buena salud dental"</p>
        
        
        </Carousel.Caption>
        {/* <button>Pide tu turno</button> */}
      </Carousel.Item>
      
      
    </Carousel>
    
   
    </div>

    
    
    
  );
}
export default Slider;