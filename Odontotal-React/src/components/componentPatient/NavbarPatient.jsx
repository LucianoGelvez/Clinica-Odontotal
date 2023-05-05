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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5ed7f95649244b326c6df093476c6681a59b1d14
  )
}

export default NavbarPatient