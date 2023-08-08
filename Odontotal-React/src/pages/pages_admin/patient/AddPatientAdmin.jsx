import React, { useContext, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context';
import Login from '../../../components/Login';
import Register from '../../../components/Register';
import baseUrl from '../../../components/utils/baseUrl.json'
import '../../../styles/pagesStyles/AddPatientAdmin.css'

const AddPatientAdmin = () => {

  const { user } = useContext(ContextGlobal);

  const [domicilio, setDomicilio] = useState({
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
  });

  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    documento: '',
    fechaIngreso: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
  });

  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'calle' || name === 'numero' || name === 'localidad' || name === 'provincia') {
      setDomicilio({
        ...domicilio,
        [name]: value,
      });
      setFormData({
        ...formData,
        domicilio: {
          ...domicilio,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const url = baseUrl.url + '/pacientes';
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
        setResponse();
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
      documento: '',
      fechaIngreso: '',
      fechaNacimiento: '',
      telefono: '',
      domicilio: {
        calle: '',
        numero: '',
        localidad: '',
        provincia: '',
      },
      email: '',
    });

    setDomicilio({
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
    });
  };

  console.log(response);
  return (
    <div className='add-patient-container'>
     
      
      {user?.rol === "ADMIN" &&
      <>
      
        
        <form onSubmit={handleSubmit}>
        <h3>Agregar Paciente</h3>
        <div className="row">
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
            <label className="control-label" htmlFor="documento">documento:</label>
            <input type="text" className="form-control" id="documento"
                placeholder="Ingrese el documento" name="documento" 
                value={formData.documento} onChange={handleInputChange} required/>
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
              value={domicilio.calle} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="numero">numero:</label>
            <input type="number" className="form-control" id="numero"
              placeholder="Ingrese el numero" name="numero" 
              value={domicilio.numero} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="localidad">localidad:</label>
            <input type="text" className="form-control" id="localidad"
              placeholder="Ingrese el localidad" name="localidad" 
              value={domicilio.localidad} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="provincia">provincia:</label>
            <input type="text" className="form-control" id="provincia"
              placeholder="Ingrese el provincia" name="provincia" 
              value={domicilio.provincia} onChange={handleInputChange} required/>
          </div>
          </div>
          <button>Agregar</button>
        </form>
       
      

      </>
      }
    </div>
      
  )
}

export default AddPatientAdmin