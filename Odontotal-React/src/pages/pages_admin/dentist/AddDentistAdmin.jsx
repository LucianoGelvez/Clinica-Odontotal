import React, { useState } from 'react';
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin';

const AddDentistAdmin = () => {
  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    matricula: '',
    email: '',
    especialidad: '',
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = '/odontologos';
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
        setResponse('Odontologo Registrado');
        resetUploadForm();
      })
      .catch((error) => {
        setResponse('Error intente nuevamente');
        resetUploadForm();
      });
  };

  const resetUploadForm = () => {
    setFormData({
      apellido: '',
      nombre: '',
      matricula: '',
    });

    console.log(formData)
  };

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
              <label className="control-label" htmlFor="apellido">
                Apellido:
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Ingrese el apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingrese el nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="matricula">
                Matricula:
              </label>
              <input
                type="text"
                className="form-control"
                id="matricula"
                placeholder="Ingrese la matricula"
                name="matricula"
                value={formData.matricula}
                onChange={handleInputChange}
                required/>
                </div>
                <button>Cargar</button>
                </form>
                </div>
                </div>
                </div>
                )}
export default AddDentistAdmin