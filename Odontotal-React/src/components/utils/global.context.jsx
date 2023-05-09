import { createContext, useContext, useEffect, useState } from "react";

export const ContextGlobal = createContext();
export const ContextProvider = ({ children }) => {

  const url_ListDentists = "http://localhost:8080/odontologos";
  const url_ListPatients = "http://localhost:8080/pacientes";
  const url_ListDentalHygienists = "http://localhost:8080/protecistas";
  const url_ListTurn = "http://localhost:8080/turnos";


  const usuarioEncontrado = localStorage.getItem('usuarioEncontrado')
  console.log(usuarioEncontrado);

  const [information, setInformation] = useState([]);
  const [showLogin,setShowLogin] = useState(!(usuarioEncontrado === 'true'))
  const [showRegister,setShowRegister] = useState(false)
  const [showDentist,setShowDentist] = useState(true)

  if(usuarioEncontrado === 'true'){
    console.log("usuarioEncontrado"); // true o false como booleano
    //setShowLogin(false)
  }
  

    const fetchData = (url) => {
      fetch(url)
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
    <ContextGlobal.Provider value={{information,showLogin, showRegister, setShowLogin, setShowRegister, showDentist,setShowDentist}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider
export const useContextGlobal = () => useContext(ContextGlobal)
