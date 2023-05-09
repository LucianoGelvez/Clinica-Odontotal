import React, { useContext, useEffect, useState } from 'react';
import '../styles/componentStyles/Login.css';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import { ContextGlobal } from './utils/global.context';
import NavbarPatient from './componentPatient/NavbarPatient';

const Login = () => {

  const { showLogin, showRegister, setShowLogin, setShowRegister, showDentist,setShowDentist} = useContext(ContextGlobal);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRol, setSelectedRol] = useState('')
  const [dataResponse, setResponse] = useState({})
  const [users, setUsers] = useState([])
  const [patients, setPatients] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [toRegister, setToRegister] = useState(true)

  const [form,setForm] = useState({
    email:'',
    password:'',
    rol:''
  })

  const url_users = "http://localhost:8080/usuarios";
  const url_patients = "http://localhost:8080/pacientes";

  useEffect(() => {

    fetch(url_users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
      
    fetch(url_patients)
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.log(error));

    console.log(patients);
  }, [ selectedRol, showDentist]);




  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setForm({...form, email:event.target.value});
  };

  const handleShowLogin = () => {
    const path = window.location.pathname;
    if (path === "/IniciarSesion") {
      window.location.href = "http://localhost:5173/Registro";
    } else {
      setShowLogin(false);
      setShowRegister(true);
    }
  };
  
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setForm({...form, password:event.target.value});
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleRolSelect = (event) => {
    setSelectedRol(event.target.value);
    setForm({...form, rol:event.target.value});
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const url = ""
  //   const settings = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(form),
  //   };

  //   fetch(url, settings)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setResponse(data);
  //       resetUploadForm();
  //     })
  //     .catch((error) => {
  //       setResponse(error);
  //       resetUploadForm();
  //     });

  //   console.log("formulario")
  //   console.log(form)

  //   console.log(dataResponse)
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const usuarioEncontrado = users.some(usuario => (
      usuario.email === form.email &&
      usuario.password === form.password &&
      usuario.rol === form.rol
    ));
    // console.log("FORMULARIO");
    // console.log(form);
    // console.log(usuarioEncontrado);

    if(usuarioEncontrado){
      console.log("usuario encontradoooooooo");
      localStorage.setItem('usuarioEncontrado', true)
      localStorage.setItem('user', JSON.stringify(form))
      setShowLogin(false)
      if(form.rol==='ROLE_ADMIN'){
        window.location.href="http://localhost:5173/ListaDeOdontologos"
      }else if(form.rol==='ROLE_USER'){
        window.location.href="http://localhost:5173/ReservarTurno"
        const pacienteEncontrado = patients.find(paciente => (
          paciente.email === form.email
        ));
        console.log("filtrer");
        localStorage.setItem('patient', JSON.stringify(pacienteEncontrado))
        setShowAlert(false)
      } else if(form.rol === "ROLE_ODONTOLOGY"){
        setShowDentist(false)
        console.log("showDentist")
        console.log(showDentist)
        window.location.href="http://localhost:5173/ListaDeOdontologos"
      }
    } else{
      setShowAlert(true)
    }

    console.log(showLogin);


  }

  const resetUploadForm = () => {
    setForm({
      email:'',
      password:'',
      rol:''
    });
  };

  return (
    <div> 
      <NavbarPatient/>
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
            <div className="form-group">
            <label htmlFor="password">Rol</label>
              <select name="selectedSpecialty" id="selectedSpecialty" onChange={handleRolSelect} required>
                <option>Selecciona un rol</option>
                <option value="ROLE_ADMIN">Administrador</option>
                <option value="ROLE_USER">Paciente</option>
                <option value="ROLE_ODONTOLOGY">Odontologo</option>
              </select>
            </div>
          </div>
          <button type="submit">Iniciar sesión</button>
          <br />
          <Link onClick={handleShowLogin}>No tienes cuenta, ¡Registrate aquí!</Link>
          {showAlert && <div style={{
            color: "red"
            }}>¡Credenciales inválidas!, verifique de nuevo</div>}
        </form>           
      </div>
    </div>
  );
}

export default Login;