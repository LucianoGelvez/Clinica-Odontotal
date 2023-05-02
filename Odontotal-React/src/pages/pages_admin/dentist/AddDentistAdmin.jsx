import React, { useState } from 'react';
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin';

const AddDentistAdmin = () => {
  const [formData, setFormData] = useState({
    apellido: '',
      nombre: '',
      matricula: '',
      email: '',
      telefono: '',
      especialidad: '',
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://34.228.53.131:8080/odontologos';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        resetUploadForm();
      })
      .catch((error) => {
        setResponse(error);
        resetUploadForm();
      });
  };

  const resetUploadForm = () => {
    setFormData({
      apellido: '',
      nombre: '',
      matricula: '',
      email: '',
      telefono: '',
      especialidad: '',
    });

    console.log(formData)
  };
    console.log(response)
  return (
    <div className="AddDentistAdmin">
      <NavbarAdmin />
     
      <div className="row">
        <div
          className="col-sm-7"
          style={{
            backgroundColor: '#e6fffa',
            padding: '10px',
            borderRadius: '3px',
          }}
        >
          <h3>Agregar Odontologo</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido">Apellido:</label>
              <input type="text"className="form-control" id="apellido" placeholder="Ingrese el apellido"
               name="apellido" value={formData.apellido} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido"> Nombre:</label>
              <input type="text"className="form-control" id="nombre" placeholder="Ingrese el nombre"
               name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="matricula"> Matricula:</label>
              <input type="text"className="form-control" id="matricula" placeholder="Ingrese el matricula"
               name="matricula" value={formData.matricula} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido"> Email:</label>
              <input type="text"className="form-control" id="email" placeholder="Ingrese el email"
               name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="apellido"> telefono:</label>
              <input type="text"className="form-control" id="telefono" placeholder="Ingrese el telefono"
               name="telefono" value={formData.telefono} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="especialidad"> Especialidad:</label>
              
               <select name="especialidad" id="especialidad" value={formData.especialidad} onChange={handleInputChange} required>
                <option >ESPECIALIDAD_ORTODONCISTA</option>
                <option >ESPECIALIDAD_PERIODONCISTA</option>
                <option >ESPECIALIDAD_ENDODONCISTA</option>
                <option >ESPECIALIDAD_ODONTOPEDIATRIA</option>
                <option >ESPECIALIDAD_CIRUGIA_ORAL</option>
                <option >ESPECIALIDAD_CIRUGIA_MAXILOFACIAL</option>
                <option >ESPECIALIDAD_PROTESISTA</option>
               </select>
            </div>
         
         
           
           
                <button>Cargar</button>
                </form>
                </div>
                </div>
                </div>
                )}
export default AddDentistAdmin