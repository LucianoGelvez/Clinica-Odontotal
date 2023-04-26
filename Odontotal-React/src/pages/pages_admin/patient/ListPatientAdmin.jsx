import React from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { useContext } from "react";
import { ContextGlobal } from '../../../components/utils/global.context';


const ListPatientAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div>ListPatientAdmin
      <NavbarAdmin/>
      <h1>Lista de Pacientes</h1>
      <ul>
        {information.map((patient) => (
          <li key={patient.id}>
            {patient.nombre} {patient.apellido} 
          </li>
        ))}
      </ul>
        <h2>dsasadasdsaasd</h2>
    </div>
  )
}

export default ListPatientAdmin