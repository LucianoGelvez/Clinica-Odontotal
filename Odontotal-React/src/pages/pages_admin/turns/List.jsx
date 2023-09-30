import "../../../styles/pagesStyles/ListTurnsAdmin.css";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";

const List = ({ data, onEditar, onEliminar }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {data[0] ? (
        <>
          <h1>Listado Turnos</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Especialidad</th>
                  <th>Odontólogo</th>
                  <th>
                    <span></span>Fecha<span></span>
                  </th>
                  <th>Hora</th>
                  <th>
                    <span></span>Acciones<span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.nombrePaciente} {item.apellidoPaciente}
                    </td>
                    <td>{item.documentoPaciente}</td>
                    <td>
                      {item.especialidad
                        .replace("ESPECIALIDAD_", "")
                        .replace("_", " ")}
                    </td>
                    <td>
                      {item.nombreOdontologo} {item.apellidoOdontologo}
                    </td>
                    <td>{item.fecha}</td>
                    <td>{item.hora.slice(0, 5)}</td>
                    <td>
                      <button
                        style={{
                          width: "85px",
                          textAlign: "center",
                          marginBottom: "4px",
                        }}
                        onClick={() => onEditar(item)}
                      >
                        Editar
                      </button>
                      <button
                        style={{ width: "85px", textAlign: "center" }}
                        onClick={() => onEliminar(item)}
                        className="btn-delete"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {showSpinner ? (
            <Spinner />
          ) : (
            <h2 style={{ textAlign: "center", margin: "50px auto" }}>
              No hay turnos agendados por el momento.
            </h2>
          )}
        </>
      )}
    </section>
  );
};
export default List;
