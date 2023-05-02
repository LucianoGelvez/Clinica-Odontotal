import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListTurnsAdmin = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  const deleteTurn = (id) => {
    console.log(id)
    document.getElementById(`${id}`).remove();
    const url = 'http://34.228.53.131:8080/turnos/'+ id;
    const settings = {
        method: 'DELETE'
    }
    fetch(url,settings)
    .then(response => response.json())
    .then(error => console.log(error))
}

  return (
    <div> <NavbarAdmin/>
      <h1>Lista aaaaaaaaaaaade Turnos</h1>
      <h1>Lista de Pacientes</h1>
    <ul>
      {information.map((turn) => (
        <li id={turn.id} key={turn.id}>
        {turn.fecha}, {turn.hora}, {turn.nombreOdontologo} ,  {turn.nombrePaciente}
        <button onClick={() => deleteTurn(turn.id)}>Borrar</button>
        </li>
        
      ))}
    </ul>
      <h2>dsasadasdsaasd</h2>
    </div>
  )
}

export default ListTurnsAdmin