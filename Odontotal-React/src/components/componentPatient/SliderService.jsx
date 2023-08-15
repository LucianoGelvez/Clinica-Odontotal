import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import image1 from '../../images/slider2.1.jpg'
import image2 from '../../images/slider2.2.jpg'
import image3 from '../../images/slider2.3.jpg'
import image4 from '../../images/slider2.4.jpg'
import image5 from '../../images/slider2.5.jpg'
import image6 from '../../images/slider2.6.jpg'
import '../../styles/componentStyles/SliderService.css'

const SliderService = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div className='container-slider'>
        
        <Carousel responsive={responsive} className='container-slider-carousel'>
            
            <div className='container-slider-carousel_card' display='none'>
                <img src={image4} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            <div className='container-slider-carousel_card'>
                <img src={image5} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            <div className='container-slider-carousel_card'>
                <img src={image6} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            <div className='container-slider-carousel_card'>
                <img src={image4} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            <div className='container-slider-carousel_card'>
                <img src={image5} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            <div className='container-slider-carousel_card'>
                <img src={image6} alt="" className='container-slider-carousel_card_img'/>
                <span className='container-slider-carousel_card_span'>Ortodoncia</span>
            </div>
            
        </Carousel>

    </div>
  )
}

export default SliderService