import React, { useContext, useEffect, useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import baseUrl from './utils/baseUrl.json'
import Swal from 'sweetalert2';

const Login = () => {
  const [form,setForm] = useState({
    email:'',
    password:'',
  })

  const [showPassword, setShowPassword] = useState(false);

  const url_login = baseUrl.url + "/login";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(url_login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      const jwt = data.jwt
      const userData = data.usuarioDto

      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(userData));

      Swal.fire(
        {
          title: 'Inicio de Sesión',
          text: `Inicio de Sesión realizado con exito.`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }
      ).then(() => {
        if(userData?.rol === "ADMIN"){
          window.location.href="http://localhost:5173/ListaDeTurnos"
        }
        else if(userData.rol === "ODONTOLOGY"){
          window.location.href="http://localhost:5173/TurnosDelOdontologo"
        }
        else{
          window.location.href="http://localhost:5173/"
        }
        
      })

    } else {
      console.error('Error al enviar los datos');
      Swal.fire(
        {
          title: 'Error de Inicio de Sesión',
          text: `Inicio de Sesión realizado rechazado, email o password incorrecto`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }
      )
    }
  };
  

  const resetUploadForm = () => {
    setForm({
      email:'',
      password:'',
      rol:''
    });
  };

  return (
    <div className='div-login'> 
      <div className="login">
        <form onSubmit={handleSubmit}>
          <img src={Logo} alt="" />
          <h2>Iniciar sesión</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" 
              value={form.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input type={showPassword ? 'text' : 'password'} name="password" 
                id="password" value={form.password} onChange={handleInputChange} required />
              <button type="button" className="show-password-button" 
              onClick={handleShowPassword}>
              </button>
            </div>
          </div>
          <button type="submit">Iniciar sesión</button>
          <br />
          <Link to='/Registro' >No tienes cuenta, ¡Registrate aquí!</Link>
        </form>           
      </div>
    </div>
  );
}

export default Login;