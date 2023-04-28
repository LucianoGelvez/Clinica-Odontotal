import React, { useContext } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListDentalHygienists = () => {
  const { information } = useContext(ContextGlobal)
  console.log(information)

  const deleteDentist = (id) => {
    console.log(id)
    document.getElementById(`${id}`).remove();
    const url = 'http://localhost:8080/protecistas/'+ id;
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
    <ul>
      {information.map((dentalHygienists, id) => (
        <li id={dentalHygienists.id} key={dentalHygienists.id}>
        {dentalHygienists.nombre}, {dentalHygienists.apellido}, {dentalHygienists.especialidad} 
        <button onClick={() => deleteDentist(dentalHygienists.id)}>Borrar</button>
        </li>
      ))}
    </ul>
      <h2>dsasadasdsaasd</h2>
  </div>
  )
}

export default ListDentalHygienists