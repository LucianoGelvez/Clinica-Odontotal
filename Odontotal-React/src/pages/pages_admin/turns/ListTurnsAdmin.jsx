import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListTurnsAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  return (
    <div> <NavbarAdmin/>
      <h1>Lista aaaaaaaaaaaade Turnos</h1>
      <h1>Lista de Pacientes</h1>
    <ul>
      {information.map((turn) => (
        <li key={turn.id}>
        {turn.fecha}, {turn.hora}, {turn.nombreOdontologo} ,  {turn.nombrePaciente}
        </li>
      ))}
    </ul>
      <h2>dsasadasdsaasd</h2>
    </div>
  )
}

export default ListTurnsAdmin