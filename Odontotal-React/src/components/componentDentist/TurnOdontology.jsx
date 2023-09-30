import React, { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../../components/utils/global.context";
import baseUrl from "../../components/utils/baseUrl.json";
import ListTurns from "../../pages/pages_dentist/ListTurns";
import "../../styles/componentStyles/TurnOdontology.css";

const TurnOdontology = () => {
  const { jwt, user } = useContext(ContextGlobal);

  const [dataTurn, setDataTurn] = useState([]);

  useEffect(() => {
    async function dataPersonalTurn() {
      const urlList = baseUrl.url + `/turnos/turnoOdontologo/${user.id}`;

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

  const handleCancelar = () => {
    setedition(false);
  };

  return (
    <div
      className="turn-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ListTurns data={dataTurn} onEditar={handleEditar} />
    </div>
  );
};

export default TurnOdontology;
