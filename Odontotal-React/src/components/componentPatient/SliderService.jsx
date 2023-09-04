import React, { useContext } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import image1 from '../../images/slider2.1.jpg'
import image2 from '../../images/slider2.2.jpg'
import image3 from '../../images/slider2.3.jpg'
import image4 from '../../images/slider2.4.jpg'
import image5 from '../../images/slider2.5.jpg'
import image6 from '../../images/slider2.6.jpg'
import '../../styles/componentStyles/SliderService.css'
import { ContextGlobal } from '../utils/global.context'

const SliderService = () => {

const {arrayService} = useContext(ContextGlobal)

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 3000, min: 1025 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 767, min: 481 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 480, min: 0 },
          items: 1
        }
      };

  return (
    <div className='container-slider-main'>
      <h2>Nuestros Servicios</h2>
    <div className='container-slider'>
        
        <Carousel responsive={responsive} className='container-slider-carousel'>
            {arrayService.map((item, id)=>(
              <div key={id} className='container-slider-carousel_card'>
                <a href={'/Servicio' +"#"+ item.id}>
                 <img src={item.imgSrc} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>{item.title}</span>           
                </a>
        
                </div>
            ))}

        </Carousel>

    </div>
    </div>
  )
}

export default SliderService
