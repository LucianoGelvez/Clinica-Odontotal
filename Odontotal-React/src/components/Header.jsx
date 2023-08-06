import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom';
import profilePic from '../images/profilePic.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope, faUser  } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../routes';
import Logo from '../images/Logo.png'
import '../styles/componentStyles/NavbarAdmin.css'
import { useContext } from 'react';
import { ContextGlobal } from '../components/utils/global.context';
const Header = () => {
  const { user, jwt } = useContext(ContextGlobal);
  const usuarioEncontrado = localStorage.getItem('user')
  const handleButton = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("user")
    window.location.href="http://localhost:5173/"
  }

  console.log(user)
  console.log(user)
  console.log(user)
  return (
    <Navbar expand="lg" className='navbar large'>
    <img className='navbar_logo' src={Logo} alt="Logo"/>
      <Container className='navbar_container'>
       <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
              {(user?.rol === undefined || user?.rol === "PATIENT") && <><Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Home}>Inicio</Nav.Link>

              {!user &&
          <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Login}>Turnos</Nav.Link>}
          {user &&
          <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
          <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
          </NavDropdown>}

              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Service}>Servicios</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.OurTeam}>Nuestro equipo</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.AboutUs}>Conocenos</Nav.Link></>}

          { user?.rol === "ODONTOLOGY" && <>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.ListDentalProsthetist}>Turnos</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.ListDentalProsthetist}>Protecistas</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.ListPatientAdmin}>Pacientes</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.profile}>Perfil</Nav.Link>
              </>}


            {user?.rol === "ADMIN" && <><NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.AddTurnAdmin}> Añadir Turno</NavDropdown.Item>
              <NavDropdown.Divider />
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
            </NavDropdown> </>}


            {user?.rol === undefined &&
          <div>
          <NavDropdown title={<FontAwesomeIcon icon={faUser}/>} id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
            <NavDropdown.Item href={routes.Login}>Iniciar Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.Register}>Registrarse</NavDropdown.Item>
          </NavDropdown>
          </div>}

          </Nav>
        </Navbar.Collapse>
      </Container>
      {user?.rol != undefined && (<>
      {user?.urlImagen ?
          <div className='profile_image'>
            <img src={user?.urlImagen} style={{
                 width: "3vw",
                borderRadius: "200px",
                height: "3vw",
                // boxShadow: "1px 6px 6px rgba(149, 56, 13, 0.5)"             
            }} /> 
          </div> :
          <div >
            <img src={profilePic} /> 
          </div>
        }</>
        )}
      {user?.rol != undefined && <button onClick={handleButton}>Cerrar Sesión</button>}
    </Navbar>

  );
}
export default Header;