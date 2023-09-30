import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../../components/utils/global.context";
import List from "./List";
import baseUrl from "../../components/utils/baseUrl.json";
import Swal from "sweetalert2";

const MyTurns = () => {
  const { jwt, user } = useContext(ContextGlobal);

  const [dataTurn, setDataTurn] = useState([]);

  useEffect(() => {
    async function dataPersonalTurn() {
      const urlList = baseUrl.url + `/turnos/turnosPaciente/${user.id}`;

      const settings = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      try {
        const response = await fetch(urlList, settings);
        const data = await response.json();
        setDataTurn(data);
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta acción cancelará el turno de especialidad ${item.especialidad.replace(
        "ESPECIALIDAD_",
        ""
      )} con ${item.nombreOdontologo} ${item.apellidoOdontologo} el día ${
        item.fecha
      } a las ${item.hora.slice(0, 5)}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTurn(item);
      }
    });
  };

  const deleteTurn = async (item) => {
    const url = baseUrl.url + "/turnos/" + item.id;

    const setting = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    try {
      const response = await fetch(url, setting);
      if (response.ok) {
        Swal.fire({
          title: "¡Cancelado!",
          text: "El turno ha sido cancelado.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
      } else {
        console.error("Error al eliminar el turno");
        Swal.fire({
          icon: "error",
          title: "Error al eliminar",
          text: "Por favor, intente de nuevo.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <List
        data={dataTurn}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
};

export default MyTurns;
