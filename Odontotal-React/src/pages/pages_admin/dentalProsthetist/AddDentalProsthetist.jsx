import React, { useContext, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context';
import Login from '../../../components/Login';
import Register from '../../../components/Register';

const AddDentalProsthetist = () => {

  const {showLogin, showRegister, setShowLogin, setShowRegister } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
      matricula: '',
      email: '',
      telefono: '',
      especialidadProtecista: '',
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8080/protecistas';
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
      nombre: '',
      apellido: '',
        matricula: '',
        email: '',
        telefono: '',
        especialidadProtecista: '',
    });

    console.log(formData)
  };
    console.log(response)
  return (
    <div>AddAddDentalHygienists
      <NavbarAdmin/>
      {showLogin && <Login/> }
      {showRegister && <Register/> }
      {!showLogin && !showRegister &&
      <>
        <h3>Agregar Protecista</h3>
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
            <label className="control-label" htmlFor="especialidadProtecista"> Descripcion:</label>
            <textarea className="form-control" name='especialidadProtecista' value={formData.especialidadProtecista} onChange={handleInputChange} id="especialidadProtecista" placeholder="Ingrese si desea una descripción"></textarea>
          </div>
          <button>Cargar</button>
        </form>
      </>
      }
    </div>
  
  )
}

export default AddDentalProsthetist