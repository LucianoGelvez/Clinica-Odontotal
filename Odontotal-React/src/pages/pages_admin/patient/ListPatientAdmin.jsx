import React from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { useContext } from "react";
import { ContextGlobal } from '../../../components/utils/global.context';


const ListPatientAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)
  const deletePatient = (id) => {
    console.log(id)
    document.getElementById(`${id}`).remove();
    const url = 'http://34.228.53.131:8080/pacientes/'+ id;
    const settings = {
        method: 'DELETE'
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(error => console.log(error))
}

  return (
    <div>ListDentistAdmin
    <NavbarAdmin/>
    <h1>Lista de Pacientes</h1>
      {information.map((patient) => (
        <li id={patient.idPaciente} key={patient.idPaciente}>
        {patient.nombre}, {patient.apellido}, {patient.especialidad} 
        <button onClick={() => deletePatient(patient.idPaciente)}>Borrar</button>
        </li>
      ))}
   
      <h2>dsasadasdsaasd</h2>
  </div>
  )
}

export default ListPatientAdmin