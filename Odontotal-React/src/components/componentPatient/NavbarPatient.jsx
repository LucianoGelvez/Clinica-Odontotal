import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo from '../../images/Logo.png'
import '../../styles/componentStyles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope, faUser  } from '@fortawesome/free-solid-svg-icons'

const NavbarPatient = () => {
  const usuarioEncontrado = localStorage.getItem('user')
  const handleButton = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("jwt")
    window.location.pathname="/"
  }
  return (
<Navbar expand="lg" className='navbar large'>  
    <img className='navbar_logo' src={Logo} alt=""/>
      <Container className='navbar_container'>
       <Navbar.Brand></Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
          <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Home}>Inicio</Nav.Link>
          {!usuarioEncontrado &&
          <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Login}>Turnos</Nav.Link>}
          {usuarioEncontrado &&
          <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
          <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
          </NavDropdown>}
            <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Service}>Servicios</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.OurTeam}>Equipo</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.AboutUs}>Conocenos</Nav.Link>
          {!usuarioEncontrado &&
          <div>
          <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
            <NavDropdown.Item href={routes.Login}>Iniciar Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.Register}>Registrarse</NavDropdown.Item>
          </NavDropdown>
          </div>}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {usuarioEncontrado && <button onClick={handleButton}>Cerrar Sesión</button>}
    </Navbar>
  )
}

export default NavbarPatient