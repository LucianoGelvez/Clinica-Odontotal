import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo from '../../images/Logo.png'
import '../../styles/componentStyles/Navbar.css'

const NavbarPatient = () => {
  return (
<Navbar expand="lg" className='navbar large'>  
    <img className='navbar_logo' src={Logo} alt=""/>
      <Container className='navbar_container'>
       <Navbar.Brand></Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
          <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Home}>Inicio</Nav.Link>
            <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
          <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
          </NavDropdown>
            <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Service}>Servicios</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.OurTeam}>Nuestro equipo</Nav.Link>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.AboutUs}>Conocenos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPatient