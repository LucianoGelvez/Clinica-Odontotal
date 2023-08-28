import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../../components/utils/global.context'
// import '../../../styles/pagesStyles/ListDentalHygienists.css'
import Form from './FormToUpdateDentist'
import List from './List'
// import Login from '../../../components/Login'
// import Register from '../../../components/Register'
import baseUrl from '../../../components/utils/baseUrl.json'

const ListDentalProsthetist = () => {
  const { information, user, jwt} = useContext(ContextGlobal);

  const [data, serData] = useState(information);
  const [edition, setedition] = useState(null);

  useEffect(() => {
    serData(information);
  }, [information]);
  
  const handleEditar = (item) => {
    setedition(item);
  };
    
  const handleEliminar = (item) => {
    serData((prevState) => prevState.filter((x) => x.id !== item.id));
    const url = baseUrl.url + "/odontologos/" + item.id;
    
    const settings = {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + jwt
      },
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
    <div className='list-odonto-container' style={{display: "flex", flexDirection: "column"}}>
      {user?.rol === "ADMIN" &&
      <>
      {edition ? (
        <Form data={edition} onGuardar={handleGuardar} informacionCompleta={data}  onCancelar={handleCancelar} jwt = {jwt} />
      ) : (
        <List data={data} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}
      </>
      }
    </div>
  );
}

export default ListDentalProsthetist;
