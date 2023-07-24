import React from 'react'
import NavbarPatient from '../../components/componentPatient/NavbarPatient'
import Slider from '../../components/componentPatient/Slider'
import '../../styles/pagesStyles/Home.css'
import Detail from '../../components/componentPatient/Detail'
import SliderService from '../../components/componentPatient/SliderService'
import Info from '../../components/componentPatient/Info'
import image1 from '../../images/fondo.jpg'




const Home = () => {

  return (
    <div className='container-home' >
      
      <div className='container-home-img'>
        
        
      <NavbarPatient/>
      <Slider/>

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

        <iframe  className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7135784576135!2d-75.590516299192!3d6.1690946596964835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682493b86ae61%3A0xe3a1b3e88840ab4!2sEnvigado%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1683151388243!5m2!1ses!2sco" 
          >

        </iframe>

        <br />
        <br />

      
      </div>
      </div>
      
  )
}

export default Home