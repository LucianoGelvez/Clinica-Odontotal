import { createContext, useEffect, useState } from "react";


export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

  const url_ListDentists = "http://localhost:8080/odontologos";
  const url_ListPatients = "http://localhost:8080/pacientes";
  const url_ListDentalHygienists = "http://localhost:8080/protecistas";
  const url_ListTurn = "http://localhost:8080/turnos";
  

  const [information, setInformation] = useState([]);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setInformation(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (window.location.pathname === "http://127.0.0.1:5173/ListaDeOdontologos") {
      fetchData(url_ListDentists);
    } else if (window.location.pathname === "http://127.0.0.1:5173/ListaDePacientes") {
      fetchData(url_ListPatients);
    } else if (window.location.pathname === "http://127.0.0.1:5173/ListaDeProtecistas") {
      fetchData(url_ListDentalHygienists);
    } else if (window.location.pathname === "http://127.0.0.1:5173/ListaDeTurnos") {
      fetchData(url_ListTurn);
    }
  }, []);

  useEffect(() => {
    if (information.length > 0) {
      console.log(information);
    }
  }, [information]);

  const contextValues = {
    information,
  };

  return (
    <ContextGlobal.Provider value={contextValues}>
      {children}
    </ContextGlobal.Provider>
  );
};