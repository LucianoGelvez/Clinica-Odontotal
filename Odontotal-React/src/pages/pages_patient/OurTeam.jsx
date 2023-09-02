import React, { useContext} from 'react'
import '../../styles/pagesStyles/OurTeamStyle.css'
import Dentist from '../../components/componentPatient/Dentist';
import { ContextGlobal } from '../../components/utils/global.context';
import team from '../../images/background/centro-clinico.webp'

const OurTeam = () => {
  const { information } = useContext(ContextGlobal)

  return (
    <div className='team'>
          
      <div className='team_branding'>

      </div>
      <h1>Nuesto personal calificado nos distingue</h1>
        
  <div className="row" >
    
 {(information != null || information != {}) && information.map((dentist)=>{
  return <Dentist key={dentist.id} nombre={dentist.nombre} apellido={dentist.apellido}
   img={dentist.urlImagen} especialidad={dentist.especialidad}/>
 })}

  </div>
  <div className='container_text'>
 <p className='container_text_desk'>Nuestro equipo de dentistas altamente capacitados tiene años de experiencia en el diagnóstico y tratamiento de una amplia variedad de problemas dentales.
   Mantenemos nuestros conocimientos actualizados para ofrecer los tratamientos dentales más avanzados y efectivos.
    Nos dedicamos a brindar una atención personalizada y de alta calidad, asegurándonos de que nuestros pacientes se sientan cómodos y seguros durante todo el proceso.
 </p>
 <p className='container_text_responsive'>
    Nos dedicamos a brindar una atención personalizada y de alta calidad, asegurándonos de que nuestros pacientes se sientan cómodos y seguros durante todo el proceso.
 </p>
 </div>
      </div>
  )
}

export default OurTeam