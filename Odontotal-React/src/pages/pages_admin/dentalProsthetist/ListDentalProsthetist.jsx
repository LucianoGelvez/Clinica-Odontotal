import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../../components/utils/global.context'
import '../../../styles/pagesStyles/ListDentalHygienists.css'
import Form from './FormToUpdateProsthetist'
import List from './List'
import baseUrl from '../../../components/utils/baseUrl.json'
import '../../../styles/pagesStyles/ListAdmin/ListADentisAdmin.css'
import Swal from 'sweetalert2';

const ListDentalProsthetist = () => {
  const { information, user, jwt } = useContext(ContextGlobal);

  const [data, serData] = useState(information);
  const [edition, setedition] = useState(null);

  useEffect(() => {
    serData(information);
  }, [information]);
  
  const handleEditar = (item) => {
    setedition(item);
  };
    
  const handleEliminar = async(item) => {
    // serData((prevState) => prevState.filter((x) => x.id !== item.id));
    const url = baseUrl.url + "/protecistas/" + item.id;
    const confirmResult = await Swal.fire({
      title: 'Confirmar datos',
      text: `¿Esta seguro que desea eliminar los datos del protecista ${item.nombre} ${item.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });
    if (confirmResult.isConfirmed) {

         try{
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            },
          });
          
          if (response.ok) {  
            Swal.fire(
              {
                icon: 'success',
                title: 'Datos eliminado correctamente',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
              }
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.pathname="/ListaDeProtecistas"
              }
            })
          } else {
            console.error('Error al enviar los datos');
            Swal.fire({
              icon: "error",
              title: "Error al eliminar",

            });
            }
        }
        catch (error) {
          console.error('Error en la conexión', error);
          }
            }
            window.location.pathname="/ListaDeProtecistas"
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
    <div className='main'>
      {user?.rol === "ADMIN" &&
      <>
      {edition ? (
        <Form data={edition} onGuardar={handleGuardar} informacionCompleta={data}  onCancelar={handleCancelar} jwt={jwt}/>
      ) : (
        <List data={data} onEditar={handleEditar} onEliminar={handleEliminar} />
      )}
      </>
      }
    </div>
  );
}

export default ListDentalProsthetist;
