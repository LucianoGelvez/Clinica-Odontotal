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
          <h1>Lista de Protecistas</h1>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.email}</td>
                  <td>{item.especialidadProtecista}</td>
                  <td>
                    <button
                      style={{ width: "85px", textAlign: "center" }}
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
        </>
      ) : (
        <>
          {showSpinner ? (
            <Spinner />
          ) : (
            <h2 style={{ textAlign: "center", margin: "50px auto" }}>
              No hay protecistas encontrados.
            </h2>
          )}
        </>
      )}
    </section>
  );
};
export default List;
