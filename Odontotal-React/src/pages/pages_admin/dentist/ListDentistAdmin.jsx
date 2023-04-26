import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'

const ListDentistAdmin = () => {

  const { information } = useContext(ContextGlobal)

  console.log(information)
  // const url_ListDentists = "http://localhost:8080/odontologos";
  
  
  // const [information, setInformation] = useState([]);

  // useEffect(()=>{
 
  //   fetch(url_ListDentists)
  //     .then((response) => response.json())
  //     .then((data) => setInformation(data))
  //     .catch((error) => console.log(error));
  // }, []);

  // console.log(information)



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

export default ListDentistAdmin