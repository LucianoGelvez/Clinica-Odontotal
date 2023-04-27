import React, { useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'

const AddPatientAdmin = () => {

    const [formData, setFormData] = useState({
      apellido: "",
      nombre: "",
      documento: "",
      fechaIngreso: "",
      fechaNacimiento: "",
      telefono: "",
      formDataDomicilio,
      email: ""
    })
    
    const [formDataDomicilio, setFormDataDomicilio] = useState({
        calle: "",
        numero: "",
        localidad: "",
        provincia: ""
    })

    const [response, setResponse] = useState('');

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      // setFormData({
      //   ...formData,
      //   [name]: value
      // });}
      setFormData({
        ...formData,
        formDataDomicilio: {
          ...formData.domicilio,
          [name]: value,
        },
      });}

    const handleSubmit = (event) => {
      event.preventDefault();
      const url = '/pacientes';
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      };
    
      fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
          setResponse('Paciente Registrado');
          resetUploadForm();
        })
        .catch((error) => {
          setResponse('Error intente nuevamente');
          resetUploadForm();
        });
    };


    const resetUploadForm = () => {
      setFormData({
        apellido: "",
        nombre: "",
        documento: "",
        fechaIngreso: "",
        fechaNacimiento: "",
        telefono: "",
        domicilio: {
          calle: "",
          numero: "",
          localidad: "",
          provincia: "",
        },
        email: ""
      });
  
      console.log(formData)
    };

  return (
    <div>
      <NavbarAdmin/>

      <div className="row">
        <div
          className="col-sm-7"
          style={{
            backgroundColor: '#e2f0fa',
            padding: '10px',
            borderRadius: '3px',
            width: "80%",
            
          }}
        >
          <h3>Agregar Paciente</h3>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
    <label className="control-label" htmlFor="apellido">Apellido:</label>
    <input type="text" className="form-control" id="apellido"
        placeholder="Ingrese el apellido" name="apellido" 
        value={formData.apellido} onChange={handleInputChange} required/>
</div>
<div className="form-group">
    <label className="control-label" htmlFor="nombre">Nombre:</label>
    <input type="text" className="form-control" id="nombre"
        placeholder="Ingrese el nombre" name="nombre" 
        value={formData.nombre} onChange={handleInputChange} required/>
</div>
            <div className="form-group">
              <label className="control-label" htmlFor="nombre">FechaIngreso:</label>
              <input type="date" className="form-control" id="fechaIngreso"
                placeholder="Ingrese el fechaIngreso" name="fechaIngreso" 
                value={formData.fechaIngreso} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="fechaNacimiento">FechaNacimiento:</label>
              <input type="date" className="form-control" id="fechaNacimiento"
                placeholder="Ingrese el fechaNacimiento" name="fechaNacimiento" 
                value={formData.fechaNacimiento} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="telefono">Telefono:</label>
              <input type="number" className="form-control" id="telefono"
                placeholder="Ingrese el fechaNacimiento" name="telefono" 
                value={formData.telefono} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email"
                placeholder="Ingrese el telefono" name="email" 
                value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="calle">calle:</label>
              <input type="text" className="form-control" id="calle"
                placeholder="Ingrese el calle" name="calle" 
                value={formData.domicilio.calle} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="numero">numero:</label>
              <input type="number" className="form-control" id="numero"
                placeholder="Ingrese el numero" name="numero" 
                value={formData.domicilio.numero} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="localidad">localidad:</label>
              <input type="text" className="form-control" id="localidad"
                placeholder="Ingrese el localidad" name="localidad" 
                value={formData.domicilio.localidad} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="provincia">provincia:</label>
              <input type="text" className="form-control" id="provincia"
                placeholder="Ingrese el provincia" name="provincia" 
                value={formData.domicilio.provincia} onChange={handleInputChange} required/>
            </div>
            
                <button>Agregar</button>
                </form>
                </div>
                </div>
                </div>
      
  )
}

export default AddPatientAdmin