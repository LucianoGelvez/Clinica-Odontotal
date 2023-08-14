import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../components/utils/global.context'
import baseUrl from '../../components/utils/baseUrl.json'
// import Swal from 'sweetalert2';
import ListTurns from './ListTurns';

const PatientHistory = (idPaciente) => {
  const { jwt, user } = useContext(ContextGlobal);

  const [dataTurn, setDataTurn] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function dataPersonalTurn() {
      const urlList = baseUrl.url + `/turnos/turnoOdontologo/${user.id}`;
      
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

    async function deleteTurn() {

      const url = baseUrl.url + "/turnos/" + item.id;

      const setting = {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      };
      try {
        const response = await fetch(url, setting)
        const data = await response.json();
        setResponse(data)
      } catch(error) {
          console.log(error)
      }
    }
   
    deleteTurn();
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
     <ListTurns data={dataTurn} onEditar={handleEditar} onEliminar={handleEliminar}/>
    </div>
  );
}

export default PatientHistory;
