import React, { useContext, useEffect, useState } from "react";
import baseUrl from "../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../components/utils/global.context";
import CompleteTurn from "./CompleteTurn";
import FormTurn from "./FormTurn";
import Spinner from "../../components/Spinner";

const ListTurns = ({ data }) => {
  const { url, jwt } = useContext(ContextGlobal);
  const [edit, setEdit] = useState(false);
  const [dataPatient, setDataPatient] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const seeDetails = (item) => {
    const url = baseUrl.url + `/pacientes/${item.pacienteId}`;

    const setting = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    async function patient() {
      const response = await fetch(url, setting);
      try {
        const data = await response.json();
        setDataPatient(data);
      } catch (error) {
        console.log(error);
      }
    }
    patient();
  };

  const handleEditar = (item) => {
    setEdit(item);
  };

  const handleCancelar = () => {
    setEdit(false);
  };
  return (
    <>
      {data.length != 0 ? (
        <>
          {edit ? (
            <FormTurn
              data={edit}
              informacionCompleta={data}
              onCancelar={handleCancelar}
              jwt={jwt}
            />
          ) : (
            <CompleteTurn data={data} onEdit={handleEditar} />
          )}
        </>
      ) : (
        <>
          {showSpinner ? (
            <Spinner />
          ) : (
            <h2 style={{ textAlign: "center", margin: "50px auto" }}>
              No tiene turnos agendados
            </h2>
          )}
        </>
      )}
    </>
  );
};
export default ListTurns;
