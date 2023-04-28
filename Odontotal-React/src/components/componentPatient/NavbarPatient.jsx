import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo from '../../images/Logo.png'

const NavbarPatient = () => {
  return (
    <Navbar bg="light" expand="lg" width={"100vw"}>
    <Container>
      <Navbar.Brand href="#home"><img src={Logo} alt="" width={"100px"}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={routes.Home}>Inicio</Nav.Link>
          <NavDropdown title="Turnos" id="basic-nav-dropdown">
            <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href={routes.Service}>Servicios</Nav.Link>
          <Nav.Link href={routes.OurTeam}>Nuestro equipo</Nav.Link>
          <Nav.Link href={routes.AboutUs}>Conocenos</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarPatient