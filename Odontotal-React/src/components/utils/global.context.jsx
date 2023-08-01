import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from './baseUrl.json'

export const ContextGlobal = createContext();
export const ContextProvider = ({ children }) => {

  const url_ListDentists = baseUrl.url + "/odontologos";
  const url_ListPatients = baseUrl.url + "/pacientes";
  const url_ListDentalHygienists = baseUrl.url + "/protecistas";
  const url_ListTurn = baseUrl.url + "/turnos";

  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({})

  const [showNavbarAdmin, setShowNavbarAdmin] = useState((user?.rol === "ADMIN" ? true : false))
  useEffect(() => {
    if (user?.rol === "ADMIN") {
      setShowNavbarAdmin(true);
    }
  }, [user]);

  const [information, setInformation] = useState([]);
  const [showLogin,setShowLogin] = useState(true)
  const [showRegister,setShowRegister] = useState(false)
  const [showDentist,setShowDentist] = useState(true)

    const fetchData = (url) => {
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setInformation(data))
        .catch((error) => console.log(error));
    };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/ListaDeOdontologos" || path === "/NuestroEquipo") {
      fetchData(url_ListDentists);
    } else if (path === "/ListaDePacientes" || path === "/AgregarTurno" || path === "/ReservarTurno") {
      fetchData(url_ListPatients);
    } else if (path === "/ListaDeProtecistas" ) {
      fetchData(url_ListDentalHygienists);
    } else if (path === "/ListaDeTurnos" || path === "/MisTurnos") {
      fetchData(url_ListTurn);
    }
  }, []);
  
  useEffect(() => {
    if (information.length > 0) {
      console.log(information);
    }
  }, [information]);
  

  return (
    <ContextGlobal.Provider value={{formData, setFormData ,information,showLogin, showRegister, setShowLogin, setShowRegister, showDentist,setShowDentist, user, setUser, jwt, setJwt,showNavbarAdmin, setShowNavbarAdmin}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider
export const useContextGlobal = () => useContext(ContextGlobal)
