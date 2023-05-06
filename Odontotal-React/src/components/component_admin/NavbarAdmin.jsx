import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo from '../../images/Logo.png'
import '../../styles/componentStyles/NavbarAdmin.css'
function NavbarAdmin() {
  const usuarioEncontrado = localStorage.getItem('usuarioEncontrado')
  const handleButton = () => {
    localStorage.setItem("usuarioEncontrado", false)
    localStorage.setItem("user", null)
    localStorage.setItem("patient", JSON.stringify({documento: ''}))
    window.location.href="http://localhost:5173/"
  }
  return (
    <Navbar expand="lg" className='navbar large'>
    <img className='navbar_logo' src={Logo} alt=""/>
      <Container className='navbar_container'>
       <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
            <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
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
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {usuarioEncontrado==='true' && <button onClick={handleButton}>Cerrar Sesión</button>}
    </Navbar>

  );
}
export default NavbarAdmin;