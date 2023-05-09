import React, { useContext, useEffect, useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { ContextGlobal } from './utils/global.context';
import { Link } from 'react-router-dom';
import NavbarPatient from './componentPatient/NavbarPatient';

const Register = () => {

  const { showLogin, showRegister, setShowLogin, setShowRegister } = useContext(ContextGlobal);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sendUser, setSendUser] = useState(false);
  const [sendPatient, setSendPatient] = useState(false);
  const [patients, setPatients] = useState([])

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

  const [formUser,setFormUser] = useState({
    email:'',
    password:'',
    rol:'ROLE_USER'
  })

  const url_patients = 'http://localhost:8080/pacientes';
  const url_users = 'http://localhost:8080/usuarios';

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
      setFormUser({...formUser, email:formData.email});
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormUser({...formUser, email:formData.email});
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormUser({...formUser, email:event.target.value});
  };
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormUser({...formUser, password:event.target.value});
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    fetch(url_patients)
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
  
        if (sendPatient && sendUser) {
          localStorage.setItem('usuarioEncontrado', true);
          localStorage.setItem('user', JSON.stringify(formUser));
          console.log("patients");
          console.log(patients);
          const pacienteEncontrado = data.find(paciente => (
            paciente.email === formData.email
          ));
          console.log(pacienteEncontrado);
          localStorage.setItem('patient', JSON.stringify(pacienteEncontrado))
          setShowRegister(false);
          setShowLogin(false);
          if (formUser.rol === 'ROLE_USER') {
            window.location.href = "http://localhost:5173";
          }
        }
      })
      .catch((error) => console.log(error));
  }, [formUser, sendPatient, sendUser]);
  



  const handleShowLogin = () => {
    const path = window.location.pathname;
    if (path === "/Registro") {
      window.location.href = "http://localhost:5173/IniciarSesion";
    } else {
      setShowLogin(true)
      setShowRegister(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const settings_patients = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(url_patients, settings_patients)
      .then((response) => response.json())
      .then((data) => {
        setSendPatient(true)
        console.log(data);
      })
      .catch((error) => {
        setResponse(error);
      });
  
      const settings_users = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formUser),
      };
  
      fetch(url_users, settings_users)
        .then((response) => response.json())
        .then((data) => {

          setSendUser(true)
        })
        .catch((error) => {
          setResponse(error);
        });
  };    

  // const resetUploadForm = () => {
  //   setFormData({
  //     apellido: '',
  //     nombre: '',
  //     documento: '',
  //     fechaIngreso: '',
  //     fechaNacimiento: '',
  //     telefono: '',
  //     domicilio: {
  //       calle: '',
  //       numero: '',
  //       localidad: '',
  //       provincia: '',
  //     },
  //     email: '',
  //   });

  //   setDomicilio({
  //     calle: '',
  //     numero: '',
  //     localidad: '',
  //     provincia: '',
  //   })
  //   setFormUser({
  //     email:'',
  //     password:'',
  //     rol:'ROLE_USER'
  //   });
  // };

  return (
    <div>
      <NavbarPatient/>
      <div className="login">
        <div className="row">
          <div
            className="col-sm-7"
            style={{
              //backgroundColor: '#e2f0fa',
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
              <label className="control-label" htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email"
                placeholder="Ingrese el email" name="email" 
                value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
            <label className="control-label" htmlFor="password">Contraseña:</label>
              <input type={showPassword ? 'text' : 'password'} name="password" 
                id="password" placeholder="Ingrese la contraseña" 
                value={password} onChange={handlePasswordChange} required />
              <button type="button" className="show-password-button" 
              onClick={handleShowPassword}>
              </button>
            </div>
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
              <label className="control-label" htmlFor="documento">Documento:</label>
              <input type="text" className="form-control" id="documento"
                  placeholder="Ingrese el documento" name="documento" 
                  value={formData.documento} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="nombre">Fecha de ingreso:</label>
              <input type="date" className="form-control" id="fechaIngreso"
                placeholder="Ingrese el fechaIngreso" name="fechaIngreso" 
                value={formData.fechaIngreso} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
              <input type="date" className="form-control" id="fechaNacimiento"
                placeholder="Ingrese el fechaNacimiento" name="fechaNacimiento" 
                value={formData.fechaNacimiento} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="telefono">Telefono:</label>
              <input type="number" className="form-control" id="telefono"
                placeholder="Ingrese el telefono" name="telefono" 
                value={formData.telefono} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="calle">Calle:</label>
              <input type="text" className="form-control" id="calle"
                placeholder="Ingrese la calle" name="calle" 
                value={domicilio.calle} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="numero">Número:</label>
              <input type="number" className="form-control" id="numero"
                placeholder="Ingrese el numero" name="numero" 
                value={domicilio.numero} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="localidad">Localidad:</label>
              <input type="text" className="form-control" id="localidad"
                placeholder="Ingrese la localidad" name="localidad" 
                value={domicilio.localidad} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="provincia">Provincia:</label>
              <input type="text" className="form-control" id="provincia"
                placeholder="Ingrese la provincia" name="provincia" 
                value={domicilio.provincia} onChange={handleInputChange} required/>
            </div>

            <button>Agregar</button>
            <Link onClick={handleShowLogin}>Si tienes cuenta, ¡Inicia sesión aquí!</Link>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;