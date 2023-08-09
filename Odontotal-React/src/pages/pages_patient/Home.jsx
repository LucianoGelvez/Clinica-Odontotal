import React from 'react'
import Slider from '../../components/componentPatient/Slider'
import '../../styles/pagesStyles/Home.css'
import Detail from '../../components/componentPatient/Detail'
import SliderService from '../../components/componentPatient/SliderService'
import Info from '../../components/componentPatient/Info'
import Spline from '@splinetool/react-spline'





const Home = () => {

  return (
    <div className='container-home' >
      
      <div className='container-home-img'>
        
        
      
      {/* <Slider/> */}
      

      <Spline scene="https://prod.spline.design/nbo5Nm8lM26WaEAF/scene.splinecode" />


      
      

      <hr className='line1'/>
      <p className='text-initial'>Bienvenidos a nuestra clínica dental, donde la salud bucal de nuestros pacientes
        es nuestra máxima prioridad. Sabemos lo importante que es mantener una sonrisa 
        saludable y radiante, y es por eso que nuestro equipo de odontólogos altamente 
        capacitados está comprometido en brindarles una atención personalizada y de alta 
        calidad. Desde limpiezas y chequeos regulares hasta procedimientos más complejos, 
        estamos aquí para ayudarles a mantener sus dientes y encías en las mejores 
        condiciones posibles. 
        Gracias por confiar en nosotros para cuidar de su salud dental.</p>
        <p className='text-responsive'>Contamos con un grupo de profesionales los cuales dia a dia se preparan para entregarle lo mejor a nuestros clientes</p>
        
        <hr className='line2'/>
        
        <Detail/>
        <SliderService/>
        <Info/>

      
      </div>
      </div>
      
  )
}

export default Home