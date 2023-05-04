import React, { useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [dataResponse, setResponse] = useState({})

  const [form,setForm] = useState({
    email:'',
    password:''
  })

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setForm({...form, email:event.target.value});
  };
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setForm({...form, password:event.target.value});
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = ""
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
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

    console.log("formulario")
    console.log(form)

    console.log(dataResponse)
  }

  const resetUploadForm = () => {
    setForm({
      email:'',
      password:''
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="" />
        <h2>Iniciar sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" 
            value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-input-container">
            <input type={showPassword ? 'text' : 'password'} name="password" 
              id="password" value={password} onChange={handlePasswordChange} required />
            <button type="button" className="show-password-button" 
            onClick={handleShowPassword}>
            </button>
          </div>
        </div>
        <button type="submit">Iniciar sesión</button>
        <br />
        <Link>No tienes cuenta, ¡Registrate aqui!</Link>
      </form>
      
    </div>
  );
}

export default Login;