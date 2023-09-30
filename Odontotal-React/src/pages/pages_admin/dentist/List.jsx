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
          <h1>Lista de Odontólogos</h1>
          <table>
            <thead>
              <tr>
                <th>Nombre y Apellido</th>
                <th>Email</th>
                <th className="none">Fecha Nacimiento</th>
                <th className="none"> Género</th>
                <th>Teléfono</th>
                <th>Documento</th>
                <th className="none">Matrícula</th>
                <th>Domicilio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.nombre} {item.apellido}
                  </td>
                  <td>{item.email}</td>
                  <td className="none">{item.fechaNacimiento}</td>
                  <td className="none">{item.genero}</td>
                  <td>{item.telefono}</td>
                  <td>{item.documento}</td>
                  <td className="none">{item.matricula}</td>
                  <td>
                    {item.calle}
                    {item.numero}, {item.localidad}, {item.provincia}
                  </td>
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
              No hay odontólogos encontrados.
            </h2>
          )}
        </>
      )}
    </section>
  );
};
export default List;
