import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from '../../../components/component_admin/NavbarAdmin'
import { ContextGlobal } from '../../../components/utils/global.context'
import '../../../styles/pagesStyles/ListDentalHygienists.css'
import Form from './FormToUpdateProsthetist'
import List from './List'
import Login from '../../../components/Login'
import Register from '../../../components/Register'

const ListDentalProsthetist = () => {
  const { information, showLogin, showRegister, setShowLogin, setShowRegister } = useContext(ContextGlobal);

  const [data, serData] = useState(information);
  const [edition, setedition] = useState(null);

  useEffect(() => {
    // Actualiza el estado de `data` cuando `information` cambia en el contexto global
    serData(information);
  }, [information]);
  
  const handleEditar = (item) => {
    setedition(item);
  };
    
  const handleEliminar = (item) => {
    serData((prevState) => prevState.filter((x) => x.id !== item.id));
    const url = "http://localhost:8080/protecistas/" + item.id;
    const settings = {
      method: "DELETE",
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((error) => console.log(error));
  };

  const handleGuardar = (item) => {
    if (edition) {
      serData((prevState) =>
        prevState.map((x) => (x.id === item.id ? item : x))
      );
      setedition(null);
    } else {
      serData((prevState) => [...prevState, { ...item, id: Date.now() }]);
    }
  };

  const handleCancelar = () => {
    setedition(false)
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <NavbarAdmin/>  
      {showLogin && <Login/> }
      {showRegister && <Register/> }
      {!showLogin && !showRegister &&
      <>
      {edition ? (
        <Form data={edition} onGuardar={handleGuardar} informacionCompleta={data}  onCancelar={handleCancelar} />
      ) : (
        <List data={data} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}
      </>
      }
    </div>
  );
}

export default ListDentalProsthetist;
