import React, { useContext, useEffect, useState } from 'react'
import baseUrl from '../../../components/utils/baseUrl.json'
import { useParams } from 'react-router-dom';
import { ContextGlobal } from '../../../components/utils/global.context';
import '../../../styles/pagesStyles/PatientHistory.css'

const PatientHistory = () => {

  const { id  } = useParams();
  const { jwt } = useContext(ContextGlobal);
  const [dataTurns, setDataTurns] = useState([])

useEffect(() => {
  async function datePatient(){
    const url = baseUrl.url + `/turnos/turnosPaciente/${id}`
    const setting = {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${jwt}`
      } 
    }
    try{
      const response = await fetch(url, setting);
      const data = await response.json();
      setDataTurns(data)

    }catch(error){
      console.log(error)
    }
  }

  datePatient();

},[])

const dateOrder = dataTurns.sort((a, b) => {
  const dateA = new Date(`${a.fecha} ${a.hora}`);
  const dateB = new Date(`${b.fecha} ${b.hora}`);
  return dateB - dateA;
});


  return (
  <div className='patient-history-container'>
    <h2 className='encabezado-ph'>HISTORIAL PACIENTE</h2>
    <section>
  {dateOrder.map((item, index) => (
    <div key={id} className={`patient-history-main ${index % 2 === 0 ? 'details-even' : 'details-odd'}`}>
      
    <details>
      
      <summary>
        <h4><span>Fecha </span><br />{item.fecha}</h4>
        <h4><span>Hora </span><br />{item.hora}</h4>
        <h4><span>Nombre </span><br />{item.nombrePaciente + " " + item.apellidoPaciente}</h4>
        <h4><span>Especialidad </span><br />{item.especialidad}</h4>
        {console.log(item)}
      </summary>
      <div className='info-patientHistory'>
        <p><span>Motivo de la visita</span><br /> {item.reasonForTurn}</p>
        <p><span>Resultado de la visita</span><br /> {item.whatWasDone}</p>
        
        </div>
    </details>
    </div>
  ))}
  </section>
  </div>

  );
}

export default PatientHistory;
