import React from "react";
import { Link } from "react-router-dom";

const CompleteTurn = ({ data, onEdit }) => {
  let filteredData = data
    ? data.filter(
        (item) =>
          item.trabajoRealizado !== null ||
          item.trabajoRealizado == "" ||
          item.trabajoRealizado == undefined
      )
    : [];

  let sortedData = filteredData
    ? [...filteredData].sort(function (a, b) {
        if (a.fecha === undefined) {
          a.fecha = "";
        }

        if (b.fecha === undefined) {
          b.fecha = "";
        }

        let dateA = new Date(a.fecha + " " + a.hora);
        let dateB = new Date(b.fecha + " " + b.hora);
        return dateA - dateB;
      })
    : [];

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Documento del Paciente</th>
            <th>Fecha y hora del turno</th>
            <th>Cerrar Turno</th>
            <th>Ver Historial</th>
          </tr>
        </thead>
        <tbody>
          {sortedData[0] && (
            <>
              {sortedData.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.nombrePaciente} {item.apellidoPaciente}
                  </td>
                  <td>{item.documentoPaciente}</td>
                  <td>
                    {item.fecha} {item.hora.slice(0, -3)}
                  </td>
                  <td>
                    <button
                      style={{ backgroundColor: "#00e0c8" }}
                      onClick={() => onEdit(item)}
                    >
                      Completar Turno
                    </button>
                  </td>
                  <td>
                    <button style={{ backgroundColor: "#00abd5" }}>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`HistorialDelPaciente/${item.pacienteId}`}
                      >
                        Historial Paciente
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CompleteTurn;
