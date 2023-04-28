import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'
import '../../../styles/pagesStyles/ListDentistAdminStyle.css'

const ListDentistAdmin = () => {

  const { information } = useContext(ContextGlobal)
  console.log(information)

  const deleteDentist = (dentist) => {
      console.log(dentist)
      // document.querySelector('#' + `${dentist.id}`).remove();

      // const url = 'http://localhost:8080/odontologos'+ dentist.id;
      // const settings = {
      //     method: 'DELETE'
      // }
      // fetch(url,settings)
      // .then(response => response.json())
      // .then(error => console.log(error))
  }
  return (
    <div>
      <NavbarAdmin/>
      <h1>Lista de Odontologos</h1>
      <table className='container-dentists'>
      <thead>
        <tr>
        {information.map(dentist => (
          <th className='container-dentists_list' id={dentist.id} key={dentist.id}>
          {dentist.nombre}, {dentist.apellido}, {dentist.especialidad} 
          <button className='container-dentists_btn-delete'  onClick={deleteDentist(dentist.id)}>Borrar</button>
          </th>
          
        ))}
        </tr>
        </thead>
      </table>
        
    </div>
  )
}

export default ListDentistAdmin