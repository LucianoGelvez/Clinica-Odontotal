import React, { useContext, useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { ContextGlobal } from './utils/global.context';
import { Link } from 'react-router-dom';

const Register = () => {

  const { showLogin, showRegister, setShowLogin, setShowRegister } = useContext(ContextGlobal);

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

      const handleShowLogin = () => {
        setShowLogin(true)
        setShowRegister(false)
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        const url = 'http://localhost:8080/pacientes';
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

  return (
    <div className="login">
      <div className="row">
        <div
          className="col-sm-7"
          style={{
            // backgroundColor: '#e2f0fa',
            padding: '10px',
            borderRadius: '3px',
            width: "80%",
          }}
        >
          {/* <h3>Agregar Paciente</h3> */}
          <form onSubmit={handleSubmit}>
          <img src={Logo} alt="" />
        <h2>Registrarse</h2>
        <p>Al ser un clinica precisamos de los siguientes datos para su mejor atencion</p>
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
              <label className="control-label" htmlFor="password">Email:</label>
              <input type="text" className="form-control" id="password"
                placeholder="Ingrese el contraseña" name="password" 
                value={formData.password} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="email">Contraseña:</label>
              <input type="text" className="form-control" id="password"
                placeholder="Ingrese el telefono" name="email" 
                value={formData.email} onChange={handleInputChange} required/>
            </div>
            
                <button>Agregar</button>
                <Link onClick={handleShowLogin}>Si tienes cuenta, ¡Inicia sesión aquí!</Link>
                </form>
                </div>
                </div>
    </div>
  );
}

export default Register;