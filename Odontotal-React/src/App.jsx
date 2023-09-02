import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import AddTurnAdmin from './pages/pages_admin/turns/AddTurnAdmin'
import EditTurnAdmin from './pages/pages_admin/turns/EditTurnAdmin'
import ListTurnsAdmin from './pages/pages_admin/turns/ListTurnsAdmin'
import AddPatientAdmin from './pages/pages_admin/patient/AddPatientAdmin'
import ListPatientAdmin from './pages/pages_admin/patient/ListPatientAdmin'
import AddDentistAdmin from './pages/pages_admin/dentist/AddDentistAdmin'
import ListDentistAdmin from './pages/pages_admin/dentist/ListDentistAdmin'
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
import Profile from './pages/Profile'
import Header from './components/Header'
import TurnOdontology from './components/componentDentist/TurnOdontology'
import ValidarUsuario from './pages/pages_patient/ValidarUsuario'
import PatientHistory from './pages/pages_admin/dentist/PatientHistory'



function App() {

  return (
    <div className="App" >
    <Header/>
    <Routes>
    <Route path={routes.Home} element={<Home/>}/>
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
    <Route path={routes.Profile} element={<Profile/>}/>
    <Route path={routes.TurnOdontology} element={<TurnOdontology/>}/>
    <Route path={routes.ValidateUser} element={<ValidarUsuario/>} />
    <Route path={routes.PatientHistory} element={<PatientHistory/>} />
    <Route path={routes.EditTurn} element={<EditTurnAdmin/>} />
    </Routes>

    <Footer/>
    </div>
  )
}

export default App