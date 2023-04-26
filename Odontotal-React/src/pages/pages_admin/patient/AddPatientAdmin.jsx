import React, { useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'

const AddPatientAdmin = () => {

    const [formData, setFormData] = useState({
      apellido: "",
      nombre: "",
      documento: "",
      fechaIngreso: "",
      domicilio: {},
      email: ""
    })
    
    const [response, setResponse] = useState('');

    // const handleInputChange = (event) => {
    //   const 
    // }

    const handleSubmit = (event) => {
      event.preventDefault();
      const url = '/pacientes';
      const setting = {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      };
    }





  return (
    <div>
      <NavbarAdmin/>
      AddPatientAdmin</div>
  )
}

export default AddPatientAdmin