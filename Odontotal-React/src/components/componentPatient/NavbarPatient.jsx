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
    <Navbar  expand="lg"  className='navbar-container'>
    <Container className='navbar-container_div'>
      <div className='navbar-container_div_in'>
      <Navbar.Brand href="#home"><img src={Logo} alt="" width={"150px"}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-container_div_in_toggler'  />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-container_div_in_collapse'>
        <Nav className="me-auto">
        <div className='navbar-container_div_in_menu'>
          <Nav.Link href={routes.Home}>Inicio</Nav.Link>
          <NavDropdown title="Turnos" id="basic-nav-dropdown">
            <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href={routes.Service}>Servicios</Nav.Link>
          <Nav.Link href={routes.OurTeam}>Nuestro equipo</Nav.Link>
          <Nav.Link href={routes.AboutUs}>Conocenos</Nav.Link>
          
          </div>
        </Nav>    
      </Navbar.Collapse>
      </div>
      
    </Container>
  </Navbar>
  )
}

export default NavbarPatient