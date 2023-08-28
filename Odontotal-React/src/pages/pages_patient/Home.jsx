import React, { useContext, useEffect } from 'react'
import Slider from '../../components/componentPatient/Slider'
import '../../styles/pagesStyles/Home.css'
import Detail from '../../components/componentPatient/Detail'
import SliderService from '../../components/componentPatient/SliderService'
import Info from '../../components/componentPatient/Info'
import Spline from '@splinetool/react-spline'
import solicitarValidacionCuenta from '../pages_patient/solicitarValidacionCuenta'
import { ContextGlobal } from '../../components/utils/global.context'
import DentistHome from '../../images/dentista.png'

const Home = () => {

  const { user, jwt } = useContext(ContextGlobal);

  // Verificamos si el usuario está logueado y si está validada la cuenta
  useEffect(() => {
    if (user) {
      solicitarValidacionCuenta(user, jwt);
    }
  }, [user])

  return (
    <div className='container-home' >
      
      <div className='container-home-img'>
        
        
      
      {/* <Slider/> */}
      

      <Spline scene="https://prod.spline.design/nbo5Nm8lM26WaEAF/scene.splinecode" />
      {/* https://prod.spline.design/nbo5Nm8lM26WaEAF/scene.splinecode */}
      {/* https://prod.spline.design/nbo5Nm8lM26WaEAF/scene.splinecode */}
      


      
      <div className='home-second-container'>
      <p className='text-initial'>"Tu Salud Oral es Nuestra Prioridad: Líderes en Cuidado Dental para Sonrisas Saludables y Felices."</p>
      {/* <button className='button-home'>Solicita tu cita</button> */}
        
        <img className='img-home-dentist' src={DentistHome} alt='Dentist' />
      </div>

      
      
        
        <Detail/>
        <SliderService/>
        <Info/>


      
      </div>
      
        
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9239217748936!2d-75.3759671!3d6.140922000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e469f20ec1656e5%3A0x76225b109cdaf976!2sCl.%2037%2C%20Rionegro%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1692921044754!5m2!1ses!2sco"
  
  height="300"
  style={{
    border: '0',
  }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>  




</div>
      
  )
}

export default Home