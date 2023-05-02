import { createContext, useContext, useEffect, useState } from "react";


export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

  const url_ListDentists = "http://34.228.53.131:8080/odontologos";
  const url_ListPatients = "http://34.228.53.131:8080/pacientes";
  const url_ListDentalHygienists = "http://34.228.53.131:8080/protecistas";
  const url_ListTurn = "http://34.228.53.131:8080/turnos";
  

  const [information, setInformation] = useState([]);

    const fetchData = (url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setInformation(data))
        .catch((error) => console.log(error));
    };


  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/ListaDeOdontologos") {
      fetchData(url_ListDentists);
    } else if (path === "/ListaDePacientes") {
      fetchData(url_ListPatients);
    } else if (path === "/ListaDeProtecistas") {
      fetchData(url_ListDentalHygienists);
    } else if (path === "/ListaDeTurnos") {
      fetchData(url_ListTurn);
    }
  }, []);
  
  useEffect(() => {
    if (information.length > 0) {
      console.log(information);
    }
  }, [information]);
  

  return (
    <ContextGlobal.Provider value={{information}}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider
export const useContextGlobal = () => useContext(ContextGlobal)
