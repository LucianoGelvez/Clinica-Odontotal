import React, { useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = ""
    fetch(url, set)
    console.log(`Email: ${email} \nPassword: ${password}`);
  }

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
            onClick={handleShowPassword}> {showPassword ? "🐱‍👤" : "👀"}
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
