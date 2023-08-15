import React, { useContext, useEffect, useState } from 'react'
import baseUrl from '../../../components/utils/baseUrl.json'
import { useParams } from 'react-router-dom';
import { ContextGlobal } from '../../../components/utils/global.context';

const PatientHistory = () => {

  const { id  } = useParams();
  const { jwt } = useContext(ContextGlobal);
  const [dataTurns, setDataTurns] = useState([])

useEffect(() => {
  async function datePatient(){
    const url = baseUrl.url + `/turnos/turnosPaciente/${id}`
    const setting = {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${jwt}`
      } 
    }
    try{
      const response = await fetch(url, setting);
      const data = await response.json();
      setDataTurns(data)

    }catch(error){
      console.log(error)
    }
  }

  datePatient();

},[])


  return (<>
  <h1>{id}</h1>
  <h3>{dataTurns.fecha}</h3>
  <h2>hola</h2></>

  );
}

export default PatientHistory;
