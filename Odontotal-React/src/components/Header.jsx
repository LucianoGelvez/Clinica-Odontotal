import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import profilePic from '../images/profilePic.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope, faUser  } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../routes';
import Logo from '../images/Logo.png'
import '../styles/componentStyles/Header.css'
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
  return (
    <Navbar expand="lg" className='navbar large'>
          <Link to={routes.Home}><img className='navbar_logo' src={Logo} alt="Logo"/></Link>
      <Container className='navbar_container'>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar_container_collapse'>
          <Nav  className="me-auto navbar_container_collapse_nav">
              {(user?.rol === undefined || user?.rol === "PATIENT" || user?.rol === "") && <><Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Home}>Inicio</Nav.Link>
              <hr />

              {!user ? <>
            <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Login}>Turnos</Nav.Link>
              <hr />
              </>
                :
                <>
            <NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
            <NavDropdown.Item href={routes.ReserveTurn}> Añadir Turno</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={routes.MyTurn}> Listar Turnos</NavDropdown.Item>
            </NavDropdown>
            </>}
            <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Service}>Servicios</Nav.Link>
              <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.OurTeam}>Equipo</Nav.Link>
              <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.AboutUs}>Conocenos</Nav.Link></>}
            
          { user?.rol === "ODONTOLOGY" && <>
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.TurnOdontology}>Turnos</Nav.Link>
              <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.ListDentalProsthetist}>Protecistas</Nav.Link>
              <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.ListPatientAdmin}>Pacientes</Nav.Link>
              <hr />
              <Nav.Link className='navbar_container_collapse_nav-navDropdown' href={routes.Profile}>Perfil</Nav.Link>
              <hr />
              </>}


            {user?.rol === "ADMIN" && <><NavDropdown title="Turnos" id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
              <NavDropdown.Item href={routes.AddTurnAdmin}> Añadir Turno</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={routes.ListTurnsAdmin}> Listar Turnos</NavDropdown.Item>
            </NavDropdown>
            <hr />
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


            {user?.rol === undefined && <>
          <div>
          <NavDropdown title={<FontAwesomeIcon icon={faUser}/>} id="basic-nav-dropdown" className='navbar_container_collapse_nav-navDropdown'>
            <NavDropdown.Item href={routes.Login}>Iniciar Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={routes.Register}>Registrarse</NavDropdown.Item>
          </NavDropdown>
          </div> 
           <div>
            <Nav.Link className='simple'  href={routes.Login}>Iniciar Sesión</Nav.Link>
            <Nav.Link className='simple' href={routes.Register}>Registrarse</Nav.Link>
           </div>
           </> 
          }

          {user?.rol != undefined && (<>
      {user?.urlImagen ?
      <div className='profile_image'>
            <img src={user?.urlImagen}/> </div>:
            <div className='profile_image'>
            <img  src={profilePic} /> 
            </div>
        }</>
        )}
        {(user?.rol != undefined || user?.rol == "") && <button class="Btn">
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text" onClick={handleButton} >Cerrar Sesión</div>
</button>}
          </Nav>

        </Navbar.Collapse>
      </Container>

    </Navbar>

  );
}
export default Header;