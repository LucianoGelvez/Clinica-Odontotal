import React, { useContext, useState } from 'react'
import baseUrl from '../../components/utils/baseUrl.json'
import { ContextGlobal } from '../utils/global.context'
import { Link } from 'react-router-dom';
import '../../styles/componentStyles/ListTurns.css'

// import PatientHistory from './PatientHistory';
const ListTurns = ({ data, onEditar, onEliminar }) => {
  const { url, jwt} = useContext(ContextGlobal);
  const[dataPatient, setDataPatient] = useState([])

  const seeDetails= (item) => {
    const url = baseUrl.url + `/pacientes/${item.pacienteId}`
    console.log(url)
    const setting = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    };
    async function patient (){
        const response = await fetch(url, setting)
        try{
          const data = await response.json();
          setDataPatient(data);
          console.log(data)
          console.log(data)
          console.log(dataPatient)
        }catch (error){
          console.log(error)
        }
    }
    patient();
  }

    return (
        <section>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Documento del Paciente</th>
              <th>Fecha y hora del turno</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
  {data !== "" && (
    <>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.nombrePaciente} {item.apellidoPaciente}</td>
          <td>{item.documentoPaciente}</td>
          <td>{item.fecha} {item.hora}</td>
          
          <td>
            <Link className='link-history'  to={`HistorialDelPaciente/${item.pacienteId}`}>Historial Paciente</Link>
          </td>
        </tr>
      ))}
    </>
  )}
</tbody>

        </table>
        </section>
      );
    }
    export default ListTurns