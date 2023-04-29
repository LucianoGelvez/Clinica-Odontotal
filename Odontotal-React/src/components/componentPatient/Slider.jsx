import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import imagen1  from '../../images/Logo.png'
import imagen2  from '../../images/Logo.png'
import imagen3  from '../../images/Logo.png'

// import '../../../styles/componentStyles/MainSlaider.css'
function Slider() {
  return (
    <Carousel className='carousel-container'>
      <Carousel.Item className='carousel-container_item'>
        <img
          src={imagen1}
          alt="First slide" width={'100%'}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={imagen2}
          alt="Second slide" width={'100%'}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={imagen3}
          alt="Third slide" width={'100%'}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default Slider;