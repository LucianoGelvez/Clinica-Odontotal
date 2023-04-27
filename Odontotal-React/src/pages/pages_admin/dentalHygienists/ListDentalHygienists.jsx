import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListDentalHygienists = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div>ListDentistAdmin
    <NavbarAdmin/>
    <h1>Lista de Pacientes</h1>
    <ul>
      {information.map((dentist, id) => (
        <li key={dentist.id}>
        {dentist.nombre}, {dentist.apellido}, {dentist.especialidad} 
        </li>
      ))}
    </ul>
      <h2>dsasadasdsaasd</h2>
  </div>
  )
}

export default ListDentalHygienists