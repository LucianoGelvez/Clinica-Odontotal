import React from 'react'
import NavbarPatient from '../../components/componentPatient/NavbarPatient'
import PeopleSmiling from '../../images/PeopleSmiling.webp'
import Mission from '../../images/Mission.png'
import Vision from '../../images/Vision.png'
import CorporatedValues from '../../images/CorporatedValues.png'
import '../../styles/pagesStyles/AboutUsStyle.css'
const AboutUs = () => {
  return (

    <div>
      <NavbarPatient/>

      <div className='about-us'>
        <img className='image' src={PeopleSmiling} alt="" />
        <h1>Quiénes Somos</h1>
        <div className='about-us_text'>
          <p>Odontotal es una clínica dental de renombre en Bogotá, Colombia, que se especializa en servicios de implantología y rehabilitación oral, así como en todos los demás servicios de odontología. La clínica fue fundada en el año 2007 bajo la dirección del reconocido especialista en implantología, Juan Perez, quien cuenta con más de 30 años de experiencia en este campo y es miembro de la Sociedad Colombiana de Implantes (SOCI) desde 1985.</p>
          <p>Gracias a su experiencia, el Dr. Perez ha seleccionado cuidadosamente un equipo de profesionales altamente capacitados y con valores en común, que garantizan un éxito cercano al 99% en tratamientos de implantes y otras especialidades. Cada miembro del equipo de Odontotal tiene una experiencia no menor a diez años en su área de especialización. Además, nuestro equipo de servicio al cliente está siempre disponible para responder cualquier pregunta o duda que puedas tener y para explicar detalladamente cada tratamiento o intervención. En Odontotal, nos tomamos el tiempo necesario para entender tus expectativas y necesidades para brindarte la mejor atención personalizada.</p>
          <p>En Odontotal, nos diferenciamos de demás clínicas dentales gracias a la relación cercana y respetuosa que establecemos con nuestros pacientes. Nos enfocamos en el cuidado de cada uno de ellos y no en el aspecto comercial. Además, nuestro modelo de servicio para adultos mayores se basa en ayudas didácticas para una mejor recuperación. Nos destacamos por brindar garantía y satisfacción, lo que nos ha permitido ganarnos la confianza de las personas.</p>
        </div>

        <div className='about-us_mission'>
          <div>
              <img src={Mission} alt="Imagen 1"/>
              <h3>Misión</h3>
              <p>Nuestra misión es proporcionar a nuestros pacientes tratamientos odontológicos integrales de la más alta calidad, con atención especializada y personalizada en una infraestructura moderna y funcional, utilizando tecnología de última generación, para lograr la satisfacción total del paciente y su bienestar oral a largo plazo.</p>
            </div>
            <div>   
              <img src={Vision} alt="Imagen 2"/>
              <h3>Visión</h3>
              <p>Convertirnos en líderes del mercado de la salud oral, reconocidos por nuestros pacientes al ofrecer tratamientos integrales de alta calidad con tecnología de última generación y un equipo de profesionales altamente calificados y comprometidos con la satisfacción y bienestar de nuestros pacientes.</p>
            </div>
            <div>
              <img src={CorporatedValues} alt="Imagen 3"/>
              <h3>Valores corporativos</h3>
              <p> Destacamos por la experiencia y alta calidad de nuestros especialistas. Nos enfocamos en casos de alta complejidad y ofrecemos soluciones estéticas mínimamente invasivas, teniendo en cuenta la comodidad y satisfacción de nuestros clientes para garantizar una experiencia agradable.</p>
            </div>
          </div>
      </div>

    </div>
  )
}

export default AboutUs