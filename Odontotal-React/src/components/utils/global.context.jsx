import { createContext, useContext, useEffect, useState } from "react";


export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  

  const url_odontologos = "http://localhost:8080/odontologos";

  const [odontologo, setOdontologo] = useState([])

  useEffect(() => {
    fetch(url_odontologos)
      .then((response) => response.json())
      .then((data) => setOdontologo(data));
      console.log(odontologo);
  }, []);


  return (
    <ContextGlobal.Provider value={odontologo}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useUserStates = () => useContext(ContextGlobal);