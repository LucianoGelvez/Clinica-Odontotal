import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import profilePic from '../../images/profilePic.svg'
import { routes } from '../../routes';
import Logo from '../../images/Logo.png'
import '../../styles/componentStyles/NavbarAdmin.css'
import { useContext, useEffect, useState } from 'react';
import { ContextGlobal } from '../utils/global.context';
import Profile from '../../pages/Profile';
function NavbarDentist() {
  const { user, jwt } = useContext(ContextGlobal);
  const [dataPesonal, setData] = useState({})


  // const usuarioEncontrado = localStorage.getItem('user')


  const handleButton = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("user")
    window.location.href="http://localhost:5173/"
  }

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('user')))
  },[])
 

  return (
    <Navbar expand="lg" className='navbar large'>
    <img className='navbar_logo' src={Logo} alt=""/>
      <Container className='navbar_container'>
       <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
          <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.profile}>Perfil</Nav.Link>
            <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.ListTurnsAdmin}> Listar Turnos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Odontologo" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.AddDentistAdmin}> Añadir Odontologo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={routes.ListDentistAdmin}> Listar Odontologos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Protecistas" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.AddDentalProsthetist}>Añadir Protecista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={routes.ListDentalProsthetist}> Listar Protecistas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pacientes" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.AddPatientAdmin}>Añadir Paciente</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={routes.ListPatientAdmin}>Listar Pacientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {dataPesonal?.urlImagen ?
          <div className='profile_image'> <Link to={routes.profile}>
            <img src={dataPesonal.urlImagen} style={{
                 width: "3vw",
                borderRadius: "200px",
                height: "3vw",
                // boxShadow: "1px 6px 6px rgba(149, 56, 13, 0.5)"             
            }} /> </Link>
          </div> :
          <div style={{display: "flex",
          flexDirection: "column",
          width: "3vw",
          borderRadius: "200px",
          height: "3vh",
          backgroundColor: "#76767b",
          padding: "0",
          margin: "0"
          }}>
            <img src={profilePic} style={{
                width: "100%",
                borderRadius: "200px",
                height: "100%",
                boxShadow: "1px 6px 6px rgba(149, 56, 13, 0.5)"
            }} /> 
          </div>
        }
      {dataPesonal && <button onClick={handleButton}>Cerrar Sesión</button>}
      {/* <Profile dataPesonal={dataPesonal}></Profile> */}
    </Navbar>

  );
}
export default NavbarDentist;