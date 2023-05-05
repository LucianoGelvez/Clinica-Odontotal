import React, { useContext, useEffect, useState } from 'react'
import NavbarPatient from '../../components/componentPatient/NavbarPatient'
import { ContextGlobal } from '../../components/utils/global.context'
import List from './List'


const MyTurns = () => {
  const pacienteId = 2 // traer Id del paciente desde el LocalStorage

  const { information } = useContext(ContextGlobal);

  const [data, serData] = useState(information);
  const [edition, setedition] = useState(null);

  useEffect(() => {
    //console.log("Information");
    //console.log(information.filter(item => pacienteId === item.pacienteId))
    //console.log("-----------");
    serData(information.filter(item => pacienteId === item.pacienteId))
  }, [information]);
  
  const handleEditar = (item) => {
    setedition(item);
  };
    
  const handleEliminar = (item) => {
    
    serData((prevState) => prevState.filter((x) => x.id !== item.id));
    const url = "http://localhost:8080/turnos/" + item.id;
    console.log(url)
    const settings = {
      method: "DELETE",
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((error) => console.log(error));
  };

  const handleGuardar = (item) => {
    console.log(item)
    console.log(item.id)
    if (edition) {
      serData((prevState) =>
        prevState.map((x) => (x.id === item.id ? item : x))
       
      );
      console.log(data)
      console.log(data)
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
      <NavbarPatient/> 
      
        <List data={data} onEditar={handleEditar} onEliminar={handleEliminar} />
      
     
    </div>
  );
}

export default MyTurns