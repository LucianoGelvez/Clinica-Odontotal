import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../../../components/utils/global.context";
import List from "./List";
import baseUrl from "../../../components/utils/baseUrl.json";
import "../../../styles/pagesStyles/ListAdmin/ListADentisAdmin.css";
import Swal from "sweetalert2";

const ListTurnsAdmin = () => {
  const { information, user, jwt } = useContext(ContextGlobal);
  const [data, setData] = useState(information);

  useEffect(() => {
    setData(information);
  }, [information]);

  const handleEditar = (item) => {
    window.location.href = "EditarTurno/" + item.id;
  };

  const handleEliminar = (item) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta acción eliminará el turno de especialidad ${item.especialidad.replace(
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
        const url = baseUrl.url + "/turnos/" + item.id;
        const settings = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        try {
          fetch(url, settings).then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "¡Eliminado!",
                text: "El turno ha sido eliminado.",
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
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="main">
      {(user?.rol === "ADMIN" || user?.rol === "ODONTOLOGY") && (
        <>
          {data.length != 0 ? (
            <List
              data={data}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ) : (
            <h1 style={{ margin: "40px" }}>
              No tienen Turnos asignados por el momento{" "}
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default ListTurnsAdmin;
