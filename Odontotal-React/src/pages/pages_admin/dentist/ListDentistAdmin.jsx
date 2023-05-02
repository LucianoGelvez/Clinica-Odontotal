import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'
import '../../../styles/pagesStyles/ListDentistAdminStyle.css'
import Table from 'react-bootstrap/Table';

const ListDentistAdmin = () => {

  const { information } = useContext(ContextGlobal)
  console.log(information)

  const deleteDentist = (id) => {
      console.log(id)
      document.getElementById(`${id}`).remove();
      const url = 'http://34.228.53.131:8080/odontologos/'+ id;
      const settings = {
          method: 'DELETE'
      }
      fetch(url,settings)
      .then(response => response.json())
      .then(error => console.log(error))
  }
  return (
    <div>
      <NavbarAdmin/>
      <h1>Lista de Odontologos</h1>
      <Table striped bordered hover>
      <thead className='container-dentists'>
           <tr className='container-dentists_type-of-date'>
           <th>Nombre</th>
           <th>Apellido</th>
           <th>Especialidad</th>
         </tr>
        {information.map(dentist => (
        
       <tbody className='container-dentists_list' id={dentist.id} key={dentist.id}>
      <tr>
        <td>{dentist.nombre}</td> 
        </tr>
      <tr>
        <td>{dentist.apellido}</td>
        </tr>
       <tr>
        <td>{dentist.especialidad}</td> 
        </tr>
      <button className='container-dentists_list_btn-delete' onClick={() => deleteDentist(dentist.id)}>Borrar</button>
        </tbody>
         )
         )
         }
         </thead>
      </Table>
        
    </div>
  )
}

export default ListDentistAdmin