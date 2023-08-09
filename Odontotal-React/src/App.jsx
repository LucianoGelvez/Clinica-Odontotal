import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import AddTurnAdmin from './pages/pages_admin/turns/AddTurnAdmin'
import ListTurnsAdmin from './pages/pages_admin/turns/ListTurnsAdmin'
import AddPatientAdmin from './pages/pages_admin/patient/AddPatientAdmin'
import ListPatientAdmin from './pages/pages_admin/patient/ListPatientAdmin'
import AddDentistAdmin from './pages/pages_admin/dentist/AddDentistAdmin'
import ListDentistAdmin from './pages/pages_admin/dentist/ListDentistAdmin'
import { useContext, useState } from 'react'
import Home from './pages/pages_patient/Home'
import Service from './pages/pages_patient/Service'
import AddAddDentalHygienists from './pages/pages_admin/dentalProsthetist/AddDentalProsthetist'
import Footer from './components/component_admin/Footer'
import Turns from './pages/pages_patient/Turns'
import AboutUs from './pages/pages_patient/AboutUs'
import OurTeam from './pages/pages_patient/OurTeam'
import MyTurns from './pages/pages_patient/MyTurns'
import ListDentalProsthetist from './pages/pages_admin/dentalProsthetist/ListDentalProsthetist'
import Login from './components/Login'
import Register from './components/Register'
import { ContextGlobal } from './components/utils/global.context';
import Profile from './pages/Profile'
// import { Navbar } from 'react-bootstrap'
import Header from './components/Header'
import PatientHistory from './pages/pages_patient/PatientHistory'


function App() {

  const { user, showNavbarAdmin} = useContext(ContextGlobal);
  const [render, setRender] = useState(showNavbarAdmin)

  return (
    <div className="App" >
    {/* {user?.rol === "ADMIN" && <NavbarAdmin/>}
    {user?.rol === "ODONTOLOGY" && <NavbarDentist/>} */}
    {/* {(user?.rol === "PATIENT" || user?.rol === undefined) && <NavbarPatient/>} */}
    <Header/>

    <Routes>
    <Route path={routes.Home} element={render ? <ListTurnsAdmin/> : <Home/>} />
    <Route path={routes.Service} element={<Service/>} />
    <Route path={routes.ReserveTurn} element={<Turns/>} />
    <Route path={routes.MyTurn} element={<MyTurns/>} />
    <Route path={routes.OurTeam} element={<OurTeam/>} />
    <Route path={routes.AboutUs} element={<AboutUs/>} />
    <Route path={routes.AddTurnAdmin} element={<AddTurnAdmin/>} />
    <Route path={routes.ListTurnsAdmin} element={<ListTurnsAdmin/>} />
    <Route path={routes.AddDentistAdmin} element={<AddDentistAdmin/>} />
    <Route path={routes.ListDentistAdmin} element={<ListDentistAdmin/>} />
    <Route path={routes.AddPatientAdmin} element={<AddPatientAdmin/>} />
    <Route path={routes.ListPatientAdmin} element={<ListPatientAdmin/>}/>
    <Route path={routes.AddDentalProsthetist} element={<AddAddDentalHygienists/>}/>
    <Route path={routes.ListDentalProsthetist} element={<ListDentalProsthetist/>}/>
    <Route path={routes.Login} element={<Login/>}/>
    <Route path={routes.Register} element={<Register/>}/>
    <Route path={routes.profile} element={<Profile></Profile>}/>
    <Route path={routes.PatientHistory} element={<PatientHistory/>}/>
    </Routes>

    <Footer/>
    </div>
  )
}

export default App
