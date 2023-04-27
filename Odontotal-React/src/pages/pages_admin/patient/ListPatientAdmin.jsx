import React from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { useContext } from "react";
import { ContextGlobal } from '../../../components/utils/global.context';


const ListPatientAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div>ListDentistAdmin
    <NavbarAdmin/>
    <h1>Lista de Pacientes</h1>
   
      {information.map((dentist) => (
        <li key={dentist.idPaciente}>
        {dentist.nombre}, {dentist.apellido}, {dentist.especialidad} 
        </li>
      ))}
   
      <h2>dsasadasdsaasd</h2>
  </div>
  )
}

export default ListPatientAdmin