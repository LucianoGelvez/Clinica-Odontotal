import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../components/utils/global.context'
import List from './List'
import baseUrl from '../../components/utils/baseUrl.json'
import Swal from 'sweetalert2';

const MyTurns = () => {
  const { jwt, user } = useContext(ContextGlobal);

  const [dataTurn, setDataTurn] = useState([]);

  useEffect(() => {
    async function dataPersonalTurn() {
      const urlList = baseUrl.url + `/turnos/tunosPaciente/${user.id}`;
      
    const settings = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    };
      try {
        const response = await fetch(urlList, settings);
        const data = await response.json();
        setDataTurn(data);
        console.log(data)
      } catch (error) {

        console.log(error);
      }
    }

    dataPersonalTurn();
  }, []);
  
  const handleEditar = (item) => {
    setedition(item);
  };
    
  const handleEliminar = (item) => {

    const url = baseUrl.url + "/turnos/" + item.id;

    const settings = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((error) => console.log(error));
  };

  // const handleGuardar = (item) => {
  //   console.log(item)
  //   console.log(item.id)
  //   if (edition) {
  //     serData((prevState) =>
  //       prevState.map((x) => (x.id === item.id ? item : x))
       
  //     );
  //     console.log(data)
  //     setedition(null);
  //   } else {
  //     serData((prevState) => [...prevState, { ...item, id: Date.now() }]);
  //   }
  // };

  const handleCancelar = () => {
    setedition(false)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
     <List data={dataTurn} onEditar={handleEditar} onEliminar={handleEliminar} />
    </div>
  );
}

export default MyTurns;
